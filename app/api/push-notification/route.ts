import type { NextRequest } from 'next/server';
import { store, nextId } from '@/lib/api/store';
import { ok, fail, requireFields } from '@/lib/api/response';

export const dynamic = 'force-dynamic';

/** 补齐 lib/mobile-notifications.ts 引用但缺失的推送路由 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('请求体不是合法 JSON');
  }

  const invalid = requireFields(body, ['title', 'message']);
  if (invalid) return fail(invalid);

  const notification = {
    id: nextId('push'),
    title: String(body.title),
    message: String(body.message),
    type: 'info' as const,
    read: false,
    createdAt: new Date().toISOString(),
  };
  store.notifications.unshift(notification);
  return ok({ pushed: true, notification }, 201);
}
