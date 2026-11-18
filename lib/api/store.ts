/**
 * @file store.ts
 * @description API 路由共享的内存数据仓库（开发/演示用，进程内持久化）
 * @module lib.api.store
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-11-18
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  location: string
  status: 'active' | 'inactive' | 'potential' | 'vip'
  value: number
  lastContact: string
  tags: string[]
  satisfaction: number
}

export interface Task {
  id: string
  title: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee: string
  dueDate: string
  createdAt: string
}

export interface Okr {
  id: string
  title: string
  progress: number
  owner: string
  status: 'on_track' | 'at_risk' | 'completed'
  dueDate: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

const customers: Customer[] = [
  { id: '1', name: '张明华', email: 'zhang@company.com', phone: '138-0000-1234', company: '科技有限公司', location: '北京市朝阳区', status: 'vip', value: 850000, lastContact: '2025-06-20', tags: ['重要客户', '长期合作'], satisfaction: 95 },
  { id: '2', name: '李小红', email: 'li@startup.com', phone: '139-0000-5678', company: '创新科技', location: '上海市浦东新区', status: 'active', value: 320000, lastContact: '2025-06-18', tags: ['新客户'], satisfaction: 87 },
  { id: '3', name: '王建国', email: 'wang@enterprise.com', phone: '137-0000-9012', company: '传统制造业', location: '广州市天河区', status: 'potential', value: 150000, lastContact: '2025-06-15', tags: ['待跟进'], satisfaction: 72 },
];

const tasks: Task[] = [
  { id: '1', title: '完成季度客户满意度调研', status: 'in_progress', priority: 'high', assignee: '张明华', dueDate: '2026-11-30', createdAt: '2026-11-01' },
  { id: '2', title: '跟进重点客户续约', status: 'pending', priority: 'urgent', assignee: '李小红', dueDate: '2026-11-25', createdAt: '2026-11-05' },
  { id: '3', title: '整理月度运营报表', status: 'completed', priority: 'medium', assignee: '王建国', dueDate: '2026-11-10', createdAt: '2026-11-02' },
];

const okrs: Okr[] = [
  { id: '1', title: '客户满意度提升至 95%', progress: 78, owner: '客服团队', status: 'on_track', dueDate: '2026-12-31' },
  { id: '2', title: '客户流失率降低 20%', progress: 54, owner: '客户成功团队', status: 'at_risk', dueDate: '2026-12-31' },
  { id: '3', title: '工单首响时间 < 5 分钟', progress: 100, owner: '支持团队', status: 'completed', dueDate: '2026-10-31' },
];

const notifications: Notification[] = [
  { id: '1', title: '新客户注册', message: '张三刚刚注册了账户', type: 'info', read: false, createdAt: new Date().toISOString() },
  { id: '2', title: '任务提醒', message: '项目A的截止日期临近', type: 'warning', read: false, createdAt: new Date().toISOString() },
  { id: '3', title: '系统更新', message: '系统将在今晚进行维护', type: 'info', read: true, createdAt: new Date().toISOString() },
];

let sequence = 100;
export const nextId = (prefix: string) => `${prefix}_${++sequence}`;

export const store = { customers, tasks, okrs, notifications };

export const bootedAt = Date.now();
