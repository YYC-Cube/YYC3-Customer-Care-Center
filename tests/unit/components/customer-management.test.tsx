import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerManagement } from '@/components/customer-management';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

/** 与组件内置种子数据一致的测试夹具（组件已改为从 /api/customers 异步加载） */
const CUSTOMERS = [
  {
    id: '1', name: '张明华', email: 'zhang@company.com', phone: '138-0000-1234',
    company: '科技有限公司', location: '北京市朝阳区', status: 'vip', value: 850000,
    lastContact: '2025-06-20', tags: ['重要客户', '长期合作'], satisfaction: 95,
  },
  {
    id: '2', name: '李小红', email: 'li@startup.com', phone: '139-0000-5678',
    company: '创新科技', location: '上海市浦东新区', status: 'active', value: 320000,
    lastContact: '2025-06-18', tags: ['新客户', '潜力大'], satisfaction: 87,
  },
  {
    id: '3', name: '王建国', email: 'wang@enterprise.com', phone: '137-0000-9012',
    company: '传统制造业', location: '广州市天河区', status: 'potential', value: 150000,
    lastContact: '2025-06-15', tags: ['待跟进'], satisfaction: 72,
  },
  {
    id: '4', name: '陈美丽', email: 'chen@design.com', phone: '136-0000-3456',
    company: '设计工作室', location: '深圳市南山区', status: 'active', value: 280000,
    lastContact: '2025-06-19', tags: ['设计行业', '合作愉快'], satisfaction: 91,
  },
  {
    id: '5', name: '刘大伟', email: 'liu@consulting.com', phone: '135-0000-7890',
    company: '咨询公司', location: '杭州市西湖区', status: 'inactive', value: 120000,
    lastContact: '2025-05-28', tags: ['需要激活'], satisfaction: 65,
  },
];

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ code: 0, message: 'ok', data: CUSTOMERS }),
      } as Response),
    ),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('CustomerManagement', () => {
  it('should render customer management component correctly', async () => {
    render(<CustomerManagement />);
    expect(screen.getByText('客户管理')).toBeInTheDocument();
    expect(screen.getByText('全生命周期客户关系管理系统')).toBeInTheDocument();
    expect(await screen.findByText('张明华')).toBeInTheDocument();
  });

  it('should display customer statistics overview', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    expect(screen.getAllByText('总客户数').length).toBeGreaterThan(0);
    expect(screen.getAllByText('活跃客户').length).toBeGreaterThan(0);
    expect(screen.getAllByText('客户价值').length).toBeGreaterThan(0);
    expect(screen.getAllByText('满意度').length).toBeGreaterThan(0);
  });

  it('should handle customer search functionality', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    const searchInput = screen.getByPlaceholderText('搜索客户姓名、公司或邮箱...');
    fireEvent.change(searchInput, { target: { value: '张明华' } });
    expect(searchInput).toHaveValue('张明华');
    expect(screen.getAllByText('张明华').length).toBeGreaterThan(0);
  });

  it('should handle status filter functionality', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    const statusFilter = screen.getByRole('combobox');
    fireEvent.mouseDown(statusFilter);

    const vipOption = screen.getByText('VIP客户');
    fireEvent.click(vipOption);

    expect(screen.getAllByText('张明华').length).toBeGreaterThan(0);
  });

  it('should display customer list with details', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    expect(screen.getAllByText('科技有限公司').length).toBeGreaterThan(0);
    expect(screen.getAllByText('138-0000-1234').length).toBeGreaterThan(0);
    expect(screen.getAllByText('北京市朝阳区').length).toBeGreaterThan(0);
  });

  it('should display customer status badges', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    expect(screen.getAllByText('VIP客户').length).toBeGreaterThan(0);
    expect(screen.getAllByText('活跃客户').length).toBeGreaterThan(0);
    expect(screen.getAllByText('潜在客户').length).toBeGreaterThan(0);
    expect(screen.getAllByText('非活跃').length).toBeGreaterThan(0);
  });

  it('should display customer satisfaction metrics', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    expect(screen.getAllByText('95%').length).toBeGreaterThan(0);
    expect(screen.getAllByText('87%').length).toBeGreaterThan(0);
    expect(screen.getAllByText('72%').length).toBeGreaterThan(0);
    expect(screen.getAllByText('91%').length).toBeGreaterThan(0);
    expect(screen.getAllByText('65%').length).toBeGreaterThan(0);
  });

  it('should display customer tags', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    expect(screen.getAllByText('重要客户').length).toBeGreaterThan(0);
    expect(screen.getAllByText('长期合作').length).toBeGreaterThan(0);
    expect(screen.getAllByText('新客户').length).toBeGreaterThan(0);
    expect(screen.getAllByText('潜力大').length).toBeGreaterThan(0);
  });

  it('should display customer value metrics', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    expect(screen.getAllByText('¥85万').length).toBeGreaterThan(0);
    expect(screen.getAllByText('¥32万').length).toBeGreaterThan(0);
    expect(screen.getAllByText('¥15万').length).toBeGreaterThan(0);
    expect(screen.getAllByText('¥28万').length).toBeGreaterThan(0);
    expect(screen.getAllByText('¥12万').length).toBeGreaterThan(0);
  });

  it('should open create customer dialog', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    fireEvent.click(screen.getByText('添加客户'));

    expect(await screen.findByText('添加新客户')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('输入客户姓名')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('输入公司名称')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('输入邮箱地址')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('输入联系电话')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('输入详细地址')).toBeInTheDocument();
  });

  it('should display customer action buttons', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    expect(screen.getAllByText('查看').length).toBeGreaterThan(0);
    expect(screen.getAllByText('编辑').length).toBeGreaterThan(0);
    expect(screen.getAllByText('联系').length).toBeGreaterThan(0);
    expect(screen.getAllByText('跟进').length).toBeGreaterThan(0);
  });

  it('should display last contact dates', async () => {
    render(<CustomerManagement />);
    await screen.findByText('张明华');

    expect(screen.getByText('2025-06-20')).toBeInTheDocument();
    expect(screen.getByText('2025-06-18')).toBeInTheDocument();
    expect(screen.getByText('2025-06-15')).toBeInTheDocument();
    expect(screen.getByText('2025-06-19')).toBeInTheDocument();
    expect(screen.getByText('2025-05-28')).toBeInTheDocument();
  });

  it('should display customer count in header', async () => {
    render(<CustomerManagement />);
    expect(await screen.findByText('共找到 5 位客户')).toBeInTheDocument();
  });
});
