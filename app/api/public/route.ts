import { ok } from '@/lib/api/response';

export const dynamic = 'force-dynamic';

export async function GET() {
  return ok({
    service: 'YYC³ Customer Care Center',
    slogan: '言启象限 | 语枢未来',
    contact: 'admin@0379.email',
  });
}
