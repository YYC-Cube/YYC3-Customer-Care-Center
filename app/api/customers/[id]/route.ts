import type { NextRequest } from 'next/server';
import { store } from '@/lib/api/store';
import { ok, fail } from '@/lib/api/response';

interface Context { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Context) {
  const { id } = await params;
  const customer = store.customers.find((c) => c.id === id);
  return customer ? ok(customer) : fail('客户不存在', 404);
}

export async function PUT(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const index = store.customers.findIndex((c) => c.id === id);
  if (index < 0) return fail('客户不存在', 404);

  let patch: Record<string, unknown>;
  try {
    patch = await request.json();
  } catch {
    return fail('请求体不是合法 JSON');
  }

  store.customers[index] = { ...store.customers[index], ...patch, id };
  return ok(store.customers[index]);
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const { id } = await params;
  const index = store.customers.findIndex((c) => c.id === id);
  if (index < 0) return fail('客户不存在', 404);
  const [removed] = store.customers.splice(index, 1);
  return ok(removed);
}
