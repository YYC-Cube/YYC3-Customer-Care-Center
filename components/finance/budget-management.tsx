/**
 * @file budget-management.tsx
 * @description budget-management component/module for YYC3 Customer Care Center
 * @module components.finance.budget-management
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Download,
  Target,
  DollarSign,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface BudgetItem {
  id: string
  category: string
  subcategory: string
  budgetAmount: number
  actualAmount: number
  period: string
  status: 'on-track' | 'over-budget' | 'under-budget'
  variance: number
  variancePercent: number
  lastUpdated: Date
}

interface BudgetAlert {
  id: string
  type: 'warning' | 'danger' | 'info'
  category: string
  message: string
  threshold: number
  currentValue: number
  timestamp: Date
}

export function BudgetManagement() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    {
      id: '1',
      category: '运营费用',
      subcategory: '人力成本',
      budgetAmount: 500000,
      actualAmount: 480000,
      period: '2024-Q1',
      status: 'under-budget',
      variance: -20000,
      variancePercent: -4.0,
      lastUpdated: new Date(),
    },
    {
      id: '2',
      category: '运营费用',
      subcategory: '办公租金',
      budgetAmount: 120000,
      actualAmount: 125000,
      period: '2024-Q1',
      status: 'over-budget',
      variance: 5000,
      variancePercent: 4.2,
      lastUpdated: new Date(),
    },
    {
      id: '3',
      category: '营销费用',
      subcategory: '广告投放',
      budgetAmount: 200000,
      actualAmount: 180000,
      period: '2024-Q1',
      status: 'under-budget',
      variance: -20000,
      variancePercent: -10.0,
      lastUpdated: new Date(),
    },
    {
      id: '4',
      category: '研发费用',
      subcategory: '技术设备',
      budgetAmount: 300000,
      actualAmount: 320000,
      period: '2024-Q1',
      status: 'over-budget',
      variance: 20000,
      variancePercent: 6.7,
      lastUpdated: new Date(),
    },
  ]);

  const [budgetAlerts, setBudgetAlerts] = useState<BudgetAlert[]>([
    {
      id: '1',
      type: 'warning',
      category: '办公租金',
      message: '办公租金支出超出预算4.2%，建议关注',
      threshold: 120000,
      currentValue: 125000,
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'danger',
      category: '技术设备',
      message: '技术设备支出超出预算6.7%，需要立即处理',
      threshold: 300000,
      currentValue: 320000,
      timestamp: new Date(),
    },
    {
      id: '3',
      type: 'info',
      category: '广告投放',
      message: '广告投放预算使用率90%，可考虑增加投入',
      threshold: 200000,
      currentValue: 180000,
      timestamp: new Date(),
    },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('2024-Q1');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // 计算总体预算统计
  const budgetStats = {
    totalBudget: budgetItems.reduce((sum, item) => sum + item.budgetAmount, 0),
    totalActual: budgetItems.reduce((sum, item) => sum + item.actualAmount, 0),
    totalVariance: budgetItems.reduce((sum, item) => sum + item.variance, 0),
    utilizationRate:
      budgetItems.reduce((sum, item) => sum + item.actualAmount, 0) /
      budgetItems.reduce((sum, item) => sum + item.budgetAmount, 0),
    overBudgetCount: budgetItems.filter((item) => item.status === 'over-budget').length,
    onTrackCount: budgetItems.filter((item) => item.status === 'on-track').length,
  };

  const getStatusBadge = (status: BudgetItem['status']) => {
    const statusConfig = {
      'on-track': { label: '正常', className: 'bg-success-100 text-success-800' },
      'over-budget': { label: '超预算', className: 'bg-danger-100 text-danger-800' },
      'under-budget': { label: '节约', className: 'bg-primary-100 text-primary-800' },
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getAlertIcon = (type: BudgetAlert['type']) => {
    switch (type) {
    case 'danger':
      return <XCircle className="w-4 h-4 text-danger-600" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-warning-600" />;
    case 'info':
      return <CheckCircle className="w-4 h-4 text-primary-600" />;
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'text-danger-600';
    if (variance < 0) return 'text-success-600';
    return 'text-neutral-600';
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-success-50 via-success-50 to-success-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 flex items-center">
            <Target className="w-8 h-8 mr-3 text-success-600" />
            预算管理
          </h1>
          <p className="text-neutral-600 mt-2">企业预算规划、执行监控与分析</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 border-l-4 border-l-success-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-Q1">2024 Q1</SelectItem>
              <SelectItem value="2024-Q2">2024 Q2</SelectItem>
              <SelectItem value="2024-Q3">2024 Q3</SelectItem>
              <SelectItem value="2024-Q4">2024 Q4</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-l-4 border-l-success-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Download className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            导出报告
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
                新建预算
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建预算项目</DialogTitle>
                <DialogDescription>设置新的预算分类和金额</DialogDescription>
              </DialogHeader>
              <CreateBudgetForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 预算概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总预算</CardTitle>
            <Target className="h-4 w-4 text-success-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success-700">¥{budgetStats.totalBudget.toLocaleString()}</div>
            <p className="text-xs text-neutral-600">本季度预算总额</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">实际支出</CardTitle>
            <DollarSign className="h-4 w-4 text-success-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success-700">¥{budgetStats.totalActual.toLocaleString()}</div>
            <p className="text-xs text-neutral-600">使用率 {(budgetStats.utilizationRate * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">预算差异</CardTitle>
            {budgetStats.totalVariance >= 0 ? (
              <TrendingUp className="h-4 w-4 text-danger-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-success-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getVarianceColor(budgetStats.totalVariance)}`}>
              {budgetStats.totalVariance >= 0 ? '+' : ''}¥{budgetStats.totalVariance.toLocaleString()}
            </div>
            <p className="text-xs text-neutral-600">
              {((budgetStats.totalVariance / budgetStats.totalBudget) * 100).toFixed(1)}% 差异
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">超预算项目</CardTitle>
            <AlertTriangle className="h-4 w-4 text-danger-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger-600">{budgetStats.overBudgetCount}</div>
            <p className="text-xs text-neutral-600">需要关注的项目</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">正常项目</CardTitle>
            <CheckCircle className="h-4 w-4 text-success-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success-600">{budgetStats.onTrackCount}</div>
            <p className="text-xs text-neutral-600">执行良好的项目</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">预算概览</TabsTrigger>
          <TabsTrigger value="details">详细分析</TabsTrigger>
          <TabsTrigger value="alerts">预警中心</TabsTrigger>
          <TabsTrigger value="forecast">预测分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 预算执行进度 */}
            <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-success-700">预算执行进度</CardTitle>
                <CardDescription>各类别预算使用情况</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {budgetItems.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.subcategory}</span>
                      <span className="text-sm text-muted-foreground">
                        {((item.actualAmount / item.budgetAmount) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-success-400 to-success-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((item.actualAmount / item.budgetAmount) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>¥{item.actualAmount.toLocaleString()}</span>
                      <span>¥{item.budgetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 预算分布图 */}
            <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-success-700">预算分布</CardTitle>
                <CardDescription>各类别预算占比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    budgetItems.reduce(
                      (acc, item) => {
                        acc[item.category] = (acc[item.category] || 0) + item.budgetAmount;
                        return acc;
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([category, amount]) => {
                    const percentage = (amount / budgetStats.totalBudget) * 100;
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{category}</span>
                          <span className="text-sm">¥{amount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-success-400 to-success-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground text-right">{percentage.toFixed(1)}%</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-success-700">预算明细</CardTitle>
              <CardDescription>详细的预算执行情况</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>类别</TableHead>
                    <TableHead>子类别</TableHead>
                    <TableHead>预算金额</TableHead>
                    <TableHead>实际支出</TableHead>
                    <TableHead>差异</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>{item.subcategory}</TableCell>
                      <TableCell>¥{item.budgetAmount.toLocaleString()}</TableCell>
                      <TableCell>¥{item.actualAmount.toLocaleString()}</TableCell>
                      <TableCell className={getVarianceColor(item.variance)}>
                        {item.variance >= 0 ? '+' : ''}¥{item.variance.toLocaleString()}
                        <br />
                        <span className="text-xs">
                          ({item.variancePercent >= 0 ? '+' : ''}
                          {item.variancePercent.toFixed(1)}%)
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="transition-all duration-300 hover:scale-105 group"
                          >
                            <Edit className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="transition-all duration-300 hover:scale-105 group"
                          >
                            <Trash2 className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-success-700">预算预警</CardTitle>
              <CardDescription>实时监控预算异常情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                      alert.type === 'danger'
                        ? 'border-danger-200 bg-danger-50'
                        : alert.type === 'warning'
                          ? 'border-warning-200 bg-warning-50'
                          : 'border-primary-200 bg-primary-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium">{alert.category}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>阈值: ¥{alert.threshold.toLocaleString()}</span>
                          <span>当前: ¥{alert.currentValue.toLocaleString()}</span>
                          <span>{alert.timestamp.toLocaleString('zh-CN')}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 group">
                        处理
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-success-700">预算预测</CardTitle>
              <CardDescription>基于历史数据的预算趋势分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">季度预测</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
                      <span>Q2 预计支出</span>
                      <span className="font-medium">¥1,180,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
                      <span>Q3 预计支出</span>
                      <span className="font-medium">¥1,250,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
                      <span>Q4 预计支出</span>
                      <span className="font-medium">¥1,320,000</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">风险评估</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-danger-600" />
                        <span className="font-medium text-danger-800">高风险</span>
                      </div>
                      <p className="text-sm text-danger-600 mt-1">技术设备预算可能超支15%</p>
                    </div>
                    <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-warning-600" />
                        <span className="font-medium text-warning-800">中风险</span>
                      </div>
                      <p className="text-sm text-warning-600 mt-1">办公租金存在上涨风险</p>
                    </div>
                    <div className="p-3 bg-success-50 border border-success-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-success-600" />
                        <span className="font-medium text-success-800">低风险</span>
                      </div>
                      <p className="text-sm text-success-600 mt-1">人力成本控制良好</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CreateBudgetForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    budgetAmount: '',
    period: '2024-Q2',
    description: '',
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">预算类别</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger className="border-l-4 border-l-success-500">
              <SelectValue placeholder="选择类别" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="运营费用">运营费用</SelectItem>
              <SelectItem value="营销费用">营销费用</SelectItem>
              <SelectItem value="研发费用">研发费用</SelectItem>
              <SelectItem value="管理费用">管理费用</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subcategory">子类别</Label>
          <Input
            id="subcategory"
            value={formData.subcategory}
            onChange={(e) => setFormData((prev) => ({ ...prev, subcategory: e.target.value }))}
            placeholder="输入子类别"
            className="border-l-4 border-l-success-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budgetAmount">预算金额</Label>
          <Input
            id="budgetAmount"
            type="number"
            value={formData.budgetAmount}
            onChange={(e) => setFormData((prev) => ({ ...prev, budgetAmount: e.target.value }))}
            placeholder="输入预算金额"
            className="border-l-4 border-l-success-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="period">预算周期</Label>
          <Select
            value={formData.period}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, period: value }))}
          >
            <SelectTrigger className="border-l-4 border-l-success-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-Q2">2024 Q2</SelectItem>
              <SelectItem value="2024-Q3">2024 Q3</SelectItem>
              <SelectItem value="2024-Q4">2024 Q4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">描述</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="预算项目描述"
          className="border-l-4 border-l-success-500"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button
          onClick={onClose}
          className="bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white"
        >
          创建预算
        </Button>
      </div>
    </div>
  );
}
