import type { NextRequest } from 'next/server';
import { store, nextId, type Okr } from '@/lib/api/store';
import { ok, fail, requireFields } from '@/lib/api/response';

export const dynamic = 'force-dynamic';

export async function GET() {
  return ok(store.okrs);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('请求体不是合法 JSON');
  }

  const invalid = requireFields(body, ['title', 'owner']);
  if (invalid) return fail(invalid);

  const okr: Okr = {
    id: nextId('okr'),
    title: String(body.title),
    owner: String(body.owner),
    progress: Number(body.progress ?? 0),
    status: (body.status as Okr['status']) ?? 'on_track',
    dueDate: String(body.dueDate ?? ''),
  };

  store.okrs.unshift(okr);
  return ok(okr, 201);
}
