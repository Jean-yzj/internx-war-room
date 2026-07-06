export type Status =
  | 'wishlist'
  | 'preparing'
  | 'submitted'
  | 'screening'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'withdrawn';

export const STATUS_LABELS: Record<Status, string> = {
  wishlist: '想投',
  preparing: '準備中',
  submitted: '已投遞',
  screening: '書審中（初審）',
  interviewing: '面試中',
  offer: '已錄取',
  rejected: '未錄取',
  withdrawn: '已放棄',
};

export type Industry =
  | '科技'
  | '金融'
  | '顧問'
  | '快消'
  | '電商'
  | '新創'
  | '教育'
  | '媒體'
  | '醫療'
  | '傳產'
  | '非營利'
  | '其他';

export const INDUSTRIES: Industry[] = [
  '科技', '金融', '顧問', '快消', '電商',
  '新創', '教育', '媒體', '醫療', '傳產', '非營利', '其他',
];

export interface Interview {
  id: string;
  round: number;
  date: string; // YYYY-MM-DD
  time?: string;
  mode?: '線上' | '實體' | '電話';
  note?: string;
}

export interface Application {
  id: string;
  company: string;
  title: string;
  link?: string;
  industry: Industry;
  status: Status;
  stars: 1 | 2 | 3 | 4 | 5;
  deadline?: string;        // 投遞截止 YYYY-MM-DD
  appliedAt?: string;
  offerDeadline?: string;
  interviews: Interview[];
  skills: string[];
  salaryText?: string;
  location?: string;
  resumeNote?: string;
  note?: string;
  jdRaw?: string;
  source: 'paste-ai' | 'paste-fallback' | 'manual';
  statusHistory: { from?: Status; to: Status; at: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface WarRoomData {
  schemaVersion: 1;
  applications: Application[];
}

// Groups for list view
export type ListGroup =
  | 'wishlist'
  | 'preparing'
  | 'active' // submitted + screening
  | 'interviewing'
  | 'offer'
  | 'ended'; // rejected + withdrawn

export const GROUP_LABELS: Record<ListGroup, string> = {
  wishlist: '想投',
  preparing: '準備中',
  active: '已投遞（含書審中）',
  interviewing: '面試中',
  offer: '已錄取',
  ended: '已結束',
};

export function getListGroup(status: Status): ListGroup {
  if (status === 'wishlist') return 'wishlist';
  if (status === 'preparing') return 'preparing';
  if (status === 'submitted' || status === 'screening') return 'active';
  if (status === 'interviewing') return 'interviewing';
  if (status === 'offer') return 'offer';
  return 'ended';
}

// nextDate logic per spec §4
export function getNextDate(app: Application): { date: string | null; kind: 'deadline' | 'interview' | 'offer' | null } {
  const today = getTodayStr();

  if (app.status === 'wishlist' || app.status === 'preparing') {
    return { date: app.deadline ?? null, kind: app.deadline ? 'deadline' : null };
  }

  if (app.status === 'interviewing') {
    const future = app.interviews
      .filter((i) => i.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (future.length > 0) return { date: future[0].date, kind: 'interview' };
    return { date: null, kind: null };
  }

  if (app.status === 'offer') {
    return { date: app.offerDeadline ?? null, kind: app.offerDeadline ? 'offer' : null };
  }

  return { date: null, kind: null };
}

export function getTodayStr(): string {
  const d = new Date();
  return formatDateStr(d);
}

export function formatDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseLocalDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

const WEEKDAY_ZH = ['日', '一', '二', '三', '四', '五', '六'];

export function formatAbsoluteDate(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const wd = WEEKDAY_ZH[d.getDay()];
  return `${m}/${day}（${wd}）`;
}

export function isExpired(dateStr: string): boolean {
  return dateStr < getTodayStr();
}

export function daysUntil(dateStr: string): number {
  const today = parseLocalDate(getTodayStr());
  const target = parseLocalDate(dateStr);
  const diff = target.getTime() - today.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
