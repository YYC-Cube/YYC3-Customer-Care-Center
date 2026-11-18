/**
 * @file task-management-enhanced.tsx
 * @description task-management-enhanced component/module for YYC3 Customer Care Center
 * @module components.task-management-enhanced
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { PageContainer } from '@/components/layout/page-container';
import { commonStyles } from '@/lib/design-system';
import {
  Search,
  Plus,
  Filter,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  MoreHorizontal,
  Flag,
  MessageSquare,
  Paperclip,
  TrendingUp,
  Target,
  Timer,
  BarChart3,
  Clock,
  FileIcon as FileTemplate,
} from 'lucide-react';

import { TimeTracker } from './time-tracker';
import { TaskTemplates } from './task-templates';

const tasks = [
  {
    id: 1,
    title: 'Q4销售报告制作',
    description: '整理Q4季度销售数据，制作详细分析报告',
    status: '进行中',
    priority: '高',
    assignee: '张经理',
    dueDate: '2025-06-25',
    progress: 75,
    tags: ['销售', '报告'],
    comments: 5,
    attachments: 3,
    timeSpent: '12h 30m',
    estimatedTime: '16h',
  },
  {
    id: 2,
    title: '客户满意度调研',
    description: '对重点客户进行满意度调研，收集反馈意见',
    status: '待开始',
    priority: '中',
    assignee: '李专员',
    dueDate: '2025-06-28',
    progress: 0,
    tags: ['客户', '调研'],
    comments: 2,
    attachments: 1,
    timeSpent: '0h',
    estimatedTime: '8h',
  },
  {
    id: 3,
    title: '产品库存盘点',
    description: '对仓库所有产品进行全面盘点，更新库存数据',
    status: '已完成',
    priority: '高',
    assignee: '王主管',
    dueDate: '2025-06-20',
    progress: 100,
    tags: ['库存', '盘点'],
    comments: 8,
    attachments: 5,
    timeSpent: '24h 15m',
    estimatedTime: '20h',
  },
];

const taskStats = [
  { label: '总任务数', value: '156', change: '+12', icon: Target, color: 'from-primary-400 to-primary-500' },
  { label: '进行中', value: '42', change: '+8', icon: PlayCircle, color: 'from-success-400 to-success-500' },
  { label: '已完成', value: '98', change: '+15', icon: CheckCircle, color: 'from-accent-400 to-primary-500' },
  { label: '完成率', value: '87.5%', change: '+5.2%', icon: BarChart3, color: 'from-warning-400 to-danger-500' },
];

export function TaskManagementEnhanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('kanban');

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [showTimeTracker, setShowTimeTracker] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [trackingTaskId, setTrackingTaskId] = useState<string | null>(null);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
    case '已完成':
      return commonStyles.badge.success;
    case '进行中':
      return commonStyles.badge.primary;
    case '待开始':
      return commonStyles.badge.warning;
    default:
      return commonStyles.badge.secondary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
    case '高':
      return 'border-danger-200 text-danger-700 bg-danger-50';
    case '中':
      return 'border-warning-200 text-warning-700 bg-warning-50';
    case '低':
      return 'border-success-200 text-success-700 bg-success-50';
    default:
      return commonStyles.badge.secondary;
    }
  };

  return (
    <PageContainer title="任务管理" description="高效管理团队任务，提升工作协作效率">
      {/* 统计卡片 */}
      <div className={commonStyles.layout.grid + ' grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}>
        {taskStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <EnhancedCard key={index} variant="glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-success-500 mr-1" />
                    <span className="text-sm font-medium text-success-600">{stat.change}</span>
                    <span className="text-xs text-neutral-500 ml-1">vs 上周</span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </EnhancedCard>
          );
        })}
      </div>

      {/* 主要内容区域 */}
      <EnhancedCard variant="gradient">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-primary-100/50 border border-primary-200">
              <TabsTrigger value="kanban" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">
                看板视图
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">
                列表视图
              </TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">
                日历视图
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">
                数据分析
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-white data-[state=active]:text-primary-700">
                任务模板
              </TabsTrigger>
              <TabsTrigger
                value="time-tracking"
                className="data-[state=active]:bg-white data-[state=active]:text-primary-700"
              >
                时间追踪
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-4 h-4" />
                <Input
                  placeholder="搜索任务..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={commonStyles.input + ' pl-10 w-64'}
                />
              </div>
              <EnhancedButton variant="secondary" icon={Filter}>
                筛选
              </EnhancedButton>
              <EnhancedButton variant="secondary" icon={Clock} onClick={() => setShowTimeTracker(true)}>
                时间追踪
              </EnhancedButton>
              <EnhancedButton variant="secondary" icon={FileTemplate} onClick={() => setShowTemplates(true)}>
                任务模板
              </EnhancedButton>
              <EnhancedButton icon={Plus}>新建任务</EnhancedButton>
            </div>
          </div>

          <TabsContent value="kanban" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 待开始 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-800 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-warning-500" />
                    待开始
                  </h3>
                  <Badge variant="outline" className="bg-warning-50 text-warning-700 border-warning-200">
                    {filteredTasks.filter((t) => t.status === '待开始').length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {filteredTasks
                    .filter((task) => task.status === '待开始')
                    .map((task) => (
                      <div key={task.id} className={`${commonStyles.card} p-4 hover:scale-[1.02] cursor-pointer`}>
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-neutral-800 text-sm leading-tight">{task.title}</h4>
                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </div>

                          <p className="text-xs text-neutral-600 line-clamp-2">{task.description}</p>

                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center text-neutral-500">
                                <Users className="w-3 h-3 mr-1" />
                                {task.assignee}
                              </div>
                            </div>
                            <div className="flex items-center text-neutral-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {task.dueDate}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-primary-100">
                            <div className="flex items-center space-x-3 text-xs text-neutral-500">
                              <div className="flex items-center">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                {task.comments}
                              </div>
                              <div className="flex items-center">
                                <Paperclip className="w-3 h-3 mr-1" />
                                {task.attachments}
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs px-2 py-0 bg-primary-50 text-primary-600 border-primary-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 进行中 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-800 flex items-center">
                    <PlayCircle className="w-5 h-5 mr-2 text-primary-500" />
                    进行中
                  </h3>
                  <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                    {filteredTasks.filter((t) => t.status === '进行中').length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {filteredTasks
                    .filter((task) => task.status === '进行中')
                    .map((task) => (
                      <div
                        key={task.id}
                        className={`${commonStyles.card} p-4 hover:scale-[1.02] cursor-pointer border-l-4 border-l-primary-400`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-neutral-800 text-sm leading-tight">{task.title}</h4>
                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </div>

                          <p className="text-xs text-neutral-600 line-clamp-2">{task.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-neutral-600">进度</span>
                              <span className="font-medium text-primary-600">{task.progress}%</span>
                            </div>
                            <div className="w-full bg-primary-100 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-primary-400 to-primary-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center text-neutral-500">
                                <Users className="w-3 h-3 mr-1" />
                                {task.assignee}
                              </div>
                              <div className="flex items-center text-neutral-500">
                                <Timer className="w-3 h-3 mr-1" />
                                {task.timeSpent}
                              </div>
                            </div>
                            <div className="flex items-center text-neutral-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {task.dueDate}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-primary-100">
                            <div className="flex items-center space-x-3 text-xs text-neutral-500">
                              <div className="flex items-center">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                {task.comments}
                              </div>
                              <div className="flex items-center">
                                <Paperclip className="w-3 h-3 mr-1" />
                                {task.attachments}
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs px-2 py-0 bg-primary-50 text-primary-600 border-primary-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 已完成 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-800 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-success-500" />
                    已完成
                  </h3>
                  <Badge variant="outline" className="bg-success-50 text-success-700 border-success-200">
                    {filteredTasks.filter((t) => t.status === '已完成').length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {filteredTasks
                    .filter((task) => task.status === '已完成')
                    .map((task) => (
                      <div
                        key={task.id}
                        className={`${commonStyles.card} p-4 hover:scale-[1.02] cursor-pointer bg-success-50/30 border-success-200`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-neutral-800 text-sm leading-tight line-through decoration-success-400">
                              {task.title}
                            </h4>
                            <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                          </div>

                          <p className="text-xs text-neutral-600 line-clamp-2">{task.description}</p>

                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center text-neutral-500">
                                <Users className="w-3 h-3 mr-1" />
                                {task.assignee}
                              </div>
                              <div className="flex items-center text-success-600">
                                <Timer className="w-3 h-3 mr-1" />
                                {task.timeSpent}
                              </div>
                            </div>
                            <div className="flex items-center text-neutral-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {task.dueDate}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-success-200">
                            <div className="flex items-center space-x-3 text-xs text-neutral-500">
                              <div className="flex items-center">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                {task.comments}
                              </div>
                              <div className="flex items-center">
                                <Paperclip className="w-3 h-3 mr-1" />
                                {task.attachments}
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs px-2 py-0 bg-success-50 text-success-600 border-success-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div key={task.id} className={`${commonStyles.card} p-6 hover:scale-[1.01] cursor-pointer`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          task.status === '已完成'
                            ? 'bg-success-400'
                            : task.status === '进行中'
                              ? 'bg-primary-400'
                              : 'bg-warning-400'
                        }`}
                      />

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3
                            className={`font-semibold text-neutral-800 ${task.status === '已完成' ? 'line-through decoration-success-400' : ''}`}
                          >
                            {task.title}
                          </h3>
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        </div>

                        <p className="text-sm text-neutral-600 mb-3">{task.description}</p>

                        <div className="flex items-center space-x-6 text-sm text-neutral-500">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-primary-500" />
                            {task.assignee}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-primary-500" />
                            {task.dueDate}
                          </div>
                          <div className="flex items-center">
                            <Timer className="w-4 h-4 mr-1 text-primary-500" />
                            {task.timeSpent} / {task.estimatedTime}
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1 text-primary-500" />
                            {task.comments} 条评论
                          </div>
                          <div className="flex items-center">
                            <Paperclip className="w-4 h-4 mr-1 text-primary-500" />
                            {task.attachments} 个附件
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {task.status === '进行中' && (
                        <div className="text-right">
                          <p className="text-sm text-neutral-600 mb-1">完成进度</p>
                          <div className="flex items-center">
                            <div className="w-20 bg-primary-100 rounded-full h-2 mr-2">
                              <div
                                className="bg-gradient-to-r from-primary-400 to-primary-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-primary-600">{task.progress}%</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <EnhancedButton variant="ghost" size="sm" icon={PlayCircle}>
                          开始
                        </EnhancedButton>
                        <EnhancedButton variant="ghost" size="sm" icon={MessageSquare}>
                          评论
                        </EnhancedButton>
                        <EnhancedButton
                          variant="ghost"
                          size="sm"
                          icon={Timer}
                          onClick={() => {
                            setTrackingTaskId(task.id.toString());
                            setShowTimeTracker(true);
                            setActiveTab('time-tracking');
                          }}
                        >
                          计时
                        </EnhancedButton>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-primary-100 flex items-center justify-between">
                    <div className="flex space-x-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-primary-50 text-primary-600 border-primary-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-neutral-500">预计时间: {task.estimatedTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <EnhancedCard title="任务日历" description="按时间线查看任务安排">
              <div className="h-96 flex items-center justify-center text-neutral-500">
                <div className="text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-primary-300" />
                  <p className="text-lg font-medium">日历视图</p>
                  <p className="text-sm">任务时间线和截止日期管理</p>
                </div>
              </div>
            </EnhancedCard>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EnhancedCard title="任务完成趋势" description="团队任务完成情况分析">
                <div className="h-64 flex items-center justify-center text-neutral-500">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-primary-300" />
                    <p>任务趋势图表区域</p>
                  </div>
                </div>
              </EnhancedCard>

              <EnhancedCard title="团队效率分析" description="成员工作效率和负载分析">
                <div className="h-64 flex items-center justify-center text-neutral-500">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-primary-300" />
                    <p>效率分析图表区域</p>
                  </div>
                </div>
              </EnhancedCard>
            </div>

            <EnhancedCard title="任务分布统计" description="按状态、优先级、负责人统计任务分布">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-primary-50/50 rounded-xl border border-primary-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">按状态分布</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">待开始</span>
                      <span className="font-medium text-warning-600">16</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">进行中</span>
                      <span className="font-medium text-primary-600">42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">已完成</span>
                      <span className="font-medium text-success-600">98</span>
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-primary-50/50 rounded-xl border border-primary-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Flag className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">按优先级分布</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">高优先级</span>
                      <span className="font-medium text-danger-600">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">中优先级</span>
                      <span className="font-medium text-warning-600">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">低优先级</span>
                      <span className="font-medium text-success-600">39</span>
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-primary-50/50 rounded-xl border border-primary-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-success-400 to-success-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">团队负载</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">张经理</span>
                      <span className="font-medium text-primary-600">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">李专员</span>
                      <span className="font-medium text-primary-600">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">王主管</span>
                      <span className="font-medium text-primary-600">15</span>
                    </div>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <TaskTemplates
              onUseTemplate={(template) => {
                console.log('使用模板:', template);
                // 处理模板使用逻辑
              }}
            />
          </TabsContent>

          <TabsContent value="time-tracking" className="space-y-6">
            <TimeTracker
              taskId={trackingTaskId || undefined}
              taskName={trackingTaskId ? tasks.find((t) => t.id.toString() === trackingTaskId)?.title : undefined}
              onTimeUpdate={(totalTime) => {
                console.log('时间更新:', totalTime);
                // 更新任务时间
              }}
            />
          </TabsContent>
        </Tabs>
      </EnhancedCard>
    </PageContainer>
  );
}
