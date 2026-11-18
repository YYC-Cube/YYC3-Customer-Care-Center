/**
 * @file loading.tsx
 * @description loading component/module for YYC3 Customer Care Center
 * @module app.analysis.loading
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, TrendingUp, Users, DollarSign, Target, Activity } from 'lucide-react';

export default function AnalysisLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* 页面标题加载状态 */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* 统计卡片加载状态 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: BarChart3, color: 'bg-primary-100' },
          { icon: TrendingUp, color: 'bg-success-100' },
          { icon: Users, color: 'bg-accent-100' },
          { icon: DollarSign, color: 'bg-warning-100' },
        ].map((item, index) => (
          <Card key={index} className="border-l-4 border-l-neutral-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-4 h-4 text-neutral-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 图表区域加载状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-primary-200 rounded-xl shadow-sm">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-neutral-400" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 模拟图表加载 */}
              <div className="h-64 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <BarChart3 className="w-12 h-12 text-neutral-300 mx-auto animate-pulse" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              </div>

              {/* 图例加载 */}
              <div className="flex justify-center space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-primary-200 rounded-xl shadow-sm">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-neutral-400" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 环形图加载 */}
              <div className="h-64 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center">
                <div className="w-32 h-32 border-8 border-neutral-200 border-t-neutral-400 rounded-full animate-spin"></div>
              </div>

              {/* 数据列表加载 */}
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="w-3 h-3 rounded-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-3 w-12" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 数据表格加载状态 */}
      <Card className="bg-white/80 backdrop-blur-sm border border-primary-200 rounded-xl shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 表格头部 */}
            <div className="grid grid-cols-5 gap-4 pb-2 border-b border-neutral-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>

            {/* 表格行 */}
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="grid grid-cols-5 gap-4 py-2">
                {[1, 2, 3, 4, 5].map((col) => (
                  <Skeleton key={col} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 底部操作区域加载 */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>

      {/* 加载提示 */}
      <div className="fixed bottom-4 right-4">
        <Card className="bg-white shadow-lg border border-primary-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-primary-900">正在加载分析数据</p>
                <p className="text-xs text-primary-600">请稍候，正在处理大量数据...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
