import { NextResponse } from 'next/server';
import { bootedAt } from '@/lib/api/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    code: 0,
    message: 'ok',
    data: {
      status: 'healthy',
      service: 'yyc3-customer-care-center',
      version: '1.0.0',
      uptimeSeconds: Math.floor((Date.now() - bootedAt) / 1000),
      timestamp: new Date().toISOString(),
    },
  });
}
