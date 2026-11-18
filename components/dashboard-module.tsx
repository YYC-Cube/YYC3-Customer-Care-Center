/**
 * @file dashboard-module.tsx
 * @description Dashboard module component for YYC3 Customer Care Center
 * @module components.dashboard-module
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  DollarSign,
  Target,
  FileCheck,
  MessageSquare,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
} from 'lucide-react';

// 使用useMemo缓存静态数据，避免每次渲染时重新创建
const useDashboardData = () => {
  return useMemo(() => {
    const moduleData = [
      {
        id: 'customers',
        title: '客户管理',
        description: '管理客户信息和关系',
        icon: Users,
        stats: { total: 1248, active: 892, growth: '+12%' },
        progress: 85,
        status: '正常',
        color: 'from-primary-500 to-primary-500',
        bgColor: 'from-primary-50 to-primary-50',
        borderColor: 'border-primary-200',
      },
      {
        id: 'tasks',
        title: '任务管理',
        description: '跟踪项目进度和任务分配',
        icon: CheckSquare,
        stats: { total: 156, completed: 89, growth: '+8%' },
        progress: 57,
        status: '进行中',
        color: 'from-success-500 to-success-500',
        bgColor: 'from-success-50 to-success-50',
        borderColor: 'border-success-200',
      },
      {
        id: 'finance',
        title: '财务管理',
        description: '财务数据分析和报表',
        icon: DollarSign,
        stats: { total: '¥2.4M', monthly: '¥180K', growth: '+15%' },
        progress: 92,
        status: '优秀',
        color: 'from-warning-500 to-warning-500',
        bgColor: 'from-warning-50 to-warning-50',
        borderColor: 'border-warning-200',
      },
      {
        id: 'okr',
        title: 'OKR管理',
        description: '目标与关键结果跟踪',
        icon: Target,
        stats: { total: 24, achieved: 18, growth: '+5%' },
        progress: 75,
        status: '良好',
        color: 'from-accent-500 to-accent-500',
        bgColor: 'from-accent-50 to-accent-50',
        borderColor: 'border-accent-200',
      },
      {
        id: 'approval',
        title: '审批中心',
        description: '工作流程和审批管理',
        icon: FileCheck,
        stats: { total: 89, pending: 12, growth: '-3%' },
        progress: 86,
        status: '待处理',
        color: 'from-primary-500 to-primary-500',
        bgColor: 'from-primary-50 to-primary-50',
        borderColor: 'border-primary-200',
      },
      {
        id: 'communication',
        title: '沟通中心',
        description: '团队协作和沟通平台',
        icon: MessageSquare,
        stats: { total: 2341, unread: 23, growth: '+25%' },
        progress: 68,
        status: '活跃',
        color: 'from-success-500 to-primary-500',
        bgColor: 'from-success-50 to-primary-50',
        borderColor: 'border-success-200',
      },
      {
        id: 'kpi',
        title: 'KPI跟踪',
        description: '关键绩效指标监控',
        icon: TrendingUp,
        stats: { total: 16, achieved: 12, growth: '+7%' },
        progress: 75,
        status: '达标',
        color: 'from-danger-500 to-accent-500',
        bgColor: 'from-danger-50 to-accent-50',
        borderColor: 'border-danger-200',
      },
      {
        id: 'analytics',
        title: '数据分析',
        description: '业务数据洞察和分析',
        icon: BarChart3,
        stats: { total: '45TB', processed: '38TB', growth: '+18%' },
        progress: 84,
        status: '正常',
        color: 'from-accent-500 to-accent-500',
        bgColor: 'from-accent-50 to-accent-50',
        borderColor: 'border-accent-200',
      },
    ];

    const quickStats = [
      {
        title: '今日任务',
        value: '24',
        change: '+3',
        trend: 'up',
        icon: CheckSquare,
        color: 'text-success-600',
      },
      {
        title: '待审批',
        value: '8',
        change: '-2',
        trend: 'down',
        icon: Clock,
        color: 'text-warning-600',
      },
      {
        title: '新消息',
        value: '15',
        change: '+5',
        trend: 'up',
        icon: MessageSquare,
        color: 'text-primary-600',
      },
      {
        title: '告警',
        value: '2',
        change: '0',
        trend: 'stable',
        icon: AlertCircle,
        color: 'text-danger-600',
      },
    ];

    return { moduleData, quickStats };
  }, []);
};

// 快速统计卡片组件
const QuickStatCard = React.memo(({ stat }: { stat: any }) => {
  const Icon = stat.icon;
  return (
    <Card className="border-primary-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-600 mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
            <div className="flex items-center mt-1">
              {stat.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-success-500 mr-1" />}
              {stat.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-danger-500 mr-1" />}
              <span
                className={`text-sm ${
                  stat.trend === 'up'
                    ? 'text-success-600'
                    : stat.trend === 'down'
                      ? 'text-danger-600'
                      : 'text-neutral-500'
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
          <div className={'w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center'}>
            <Icon className={`w-6 h-6 ${stat.color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
QuickStatCard.displayName = 'QuickStatCard';

// 模块卡片组件
const ModuleCard = React.memo(({ module }: { module: any }) => {
  const Icon = module.icon;
  return (
    <Card
      key={module.id}
      className={`${module.borderColor} shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <Badge variant="secondary" className={`bg-gradient-to-r ${module.bgColor} text-neutral-700 border-0`}>
            {module.status}
          </Badge>
        </div>
        <CardTitle className="text-lg text-neutral-800 group-hover:text-primary-700 transition-colors">
          {module.title}
        </CardTitle>
        <CardDescription className="text-neutral-600">{module.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">完成度</span>
            <span className="font-medium text-neutral-800">{module.progress}%</span>
          </div>
          <Progress value={module.progress} className="h-2" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-600">
              {typeof module.stats.total === 'string' ? module.stats.total : `${module.stats.total} 项`}
            </span>
            <span
              className={`font-medium ${
                module.stats.growth.startsWith('+')
                  ? 'text-success-600'
                  : module.stats.growth.startsWith('-')
                    ? 'text-danger-600'
                    : 'text-neutral-600'
              }`}
            >
              {module.stats.growth}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
ModuleCard.displayName = 'ModuleCard';

// 系统状态卡片组件
const SystemStatusCard = React.memo(() => {
  return (
    <Card className="border-primary-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-neutral-800">系统运行状态</CardTitle>
        <CardDescription>实时监控系统各项指标</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-8 h-8 bg-success-500 rounded-full animate-pulse"></div>
            </div>
            <h3 className="font-medium text-neutral-800 mb-1">系统状态</h3>
            <p className="text-sm text-success-600">运行正常</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="font-medium text-neutral-800 mb-1">性能指标</h3>
            <p className="text-sm text-primary-600">优秀 (95%)</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-accent-500" />
            </div>
            <h3 className="font-medium text-neutral-800 mb-1">在线用户</h3>
            <p className="text-sm text-accent-600">1,247 人</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
SystemStatusCard.displayName = 'SystemStatusCard';

// 主仪表盘组件
const DashboardModuleComponent = () => {
  const { moduleData, quickStats } = useDashboardData();

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">企业管理仪表盘</h1>
          <p className="text-neutral-600">全面掌控企业运营状况</p>
        </div>
      </div>

      {/* 快速统计 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <QuickStatCard key={index} stat={stat} />
        ))}
      </div>

      {/* 模块概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {moduleData.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      {/* 系统状态 */}
      <SystemStatusCard />
    </div>
  );
};

// 使用React.memo包装主组件，避免不必要的重渲染
export const DashboardModule = React.memo(DashboardModuleComponent);
