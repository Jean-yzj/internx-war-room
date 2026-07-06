import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      status: 'healthy',
      ts: new Date().toISOString(),
      version: '1.0.0',
    },
    { status: 200 }
  );
}
