import type { Metadata } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
  fallback: ['PingFang TC', 'Microsoft JhengHei', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'InternX 投遞戰情室 | 求職申請日曆管理',
  description: '把職缺內容貼進來，3 秒自動辨識欄位並建立申請日曆。管理截止日、面試、Offer 回覆期限，追蹤求職進度。',
  metadataBase: new URL('https://internx-war-room.zeabur.app'),
  alternates: {
    canonical: 'https://internx-war-room.zeabur.app',
  },
  openGraph: {
    type: 'website',
    title: 'InternX 投遞戰情室',
    description: '把職缺內容貼進來，3 秒自動辨識欄位並建立申請日曆。',
    url: 'https://internx-war-room.zeabur.app',
    siteName: 'InternX 投遞戰情室',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'InternX 投遞戰情室',
      },
    ],
    locale: 'zh_TW',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InternX 投遞戰情室',
    description: '把職缺內容貼進來，3 秒自動辨識欄位並建立申請日曆。',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant-TW" className={notoSansTC.variable}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
