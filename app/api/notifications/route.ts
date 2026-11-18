import type { NextRequest } from 'next/server';
import { store, nextId, type Notification } from '@/lib/api/store';
import { ok, fail, requireFields } from '@/lib/api/response';

export const dynamic = 'force-dynamic';

export async function GET() {
  return ok(store.notifications);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('请求体不是合法 JSON');
  }

  const invalid = requireFields(body, ['title', 'message']);
  if (invalid) return fail(invalid);

  const notification: Notification = {
    id: nextId('ntf'),
    title: String(body.title),
    message: String(body.message),
    type: (body.type as Notification['type']) ?? 'info',
    read: false,
    createdAt: new Date().toISOString(),
  };

  store.notifications.unshift(notification);
  return ok(notification, 201);
}
