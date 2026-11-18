import type { NextRequest } from 'next/server';
import { store, nextId, type Task } from '@/lib/api/store';
import { ok, fail, requireFields } from '@/lib/api/response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get('status');
  const data = status ? store.tasks.filter((t) => t.status === status) : store.tasks;
  return ok(data);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('请求体不是合法 JSON');
  }

  const invalid = requireFields(body, ['title']);
  if (invalid) return fail(invalid);

  const task: Task = {
    id: nextId('task'),
    title: String(body.title),
    status: (body.status as Task['status']) ?? 'pending',
    priority: (body.priority as Task['priority']) ?? 'medium',
    assignee: String(body.assignee ?? ''),
    dueDate: String(body.dueDate ?? ''),
    createdAt: new Date().toISOString().slice(0, 10),
  };

  store.tasks.unshift(task);
  return ok(task, 201);
}
