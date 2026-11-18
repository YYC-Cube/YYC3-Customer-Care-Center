import type { NextRequest } from 'next/server';
import { store, nextId, type Customer } from '@/lib/api/store';
import { ok, fail, requireFields } from '@/lib/api/response';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get('status');
  const keyword = request.nextUrl.searchParams.get('q')?.toLowerCase();
  let data = store.customers;
  if (status) data = data.filter((c) => c.status === status);
  if (keyword) {
    data = data.filter((c) =>
      [c.name, c.company, c.email].some((v) => v.toLowerCase().includes(keyword)),
    );
  }
  return ok(data);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('请求体不是合法 JSON');
  }

  const invalid = requireFields(body, ['name', 'email', 'company']);
  if (invalid) return fail(invalid);

  const customer: Customer = {
    id: nextId('cust'),
    name: String(body.name),
    email: String(body.email),
    phone: String(body.phone ?? ''),
    company: String(body.company),
    location: String(body.location ?? ''),
    status: (body.status as Customer['status']) ?? 'potential',
    value: Number(body.value ?? 0),
    lastContact: new Date().toISOString().slice(0, 10),
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
    satisfaction: Number(body.satisfaction ?? 0),
  };

  store.customers.unshift(customer);
  return ok(customer, 201);
}
