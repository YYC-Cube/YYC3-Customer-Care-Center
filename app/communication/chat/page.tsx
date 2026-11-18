/**
 * @file page.tsx
 * @description page component/module for YYC3 Customer Care Center
 * @module app.communication.chat.page
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { RealTimeChat } from '@/components/real-time-chat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Plus, Settings, Search, Filter, Zap, TrendingUp } from 'lucide-react';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(searchParams.get('id') || undefined);
  const [currentUserId] = useState('current-user'); // 实际应用中从认证系统获取

  // 聊天统计数据
  const [chatStats, setChatStats] = useState({
    totalMessages: 1247,
    activeChats: 8,
    onlineUsers: 23,
    todayMessages: 156,
  });

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-primary-50 via-primary-50 to-primary-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-primary-600" />
            团队聊天
          </h1>
          <p className="text-neutral-600 mt-1">实时沟通与协作交流</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-l-4 border-l-primary-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Search className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            搜索消息
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-l-4 border-l-primary-500 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-transparent group"
          >
            <Filter className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            筛选
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
            <Plus className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-all duration-300" />
            新建群聊
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary-600" />
              总消息数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-600">{chatStats.totalMessages.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">累计发送消息</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary-600" />
              活跃聊天
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-600">{chatStats.activeChats}</div>
            <p className="text-sm text-muted-foreground">正在进行的对话</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Zap className="w-5 h-5 mr-2 text-primary-600" />
              在线用户
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-600">{chatStats.onlineUsers}</div>
            <p className="text-sm text-muted-foreground">当前在线人数</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
              今日消息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-600">{chatStats.todayMessages}</div>
            <p className="text-sm text-muted-foreground">今天发送的消息</p>
          </CardContent>
        </Card>
      </div>

      {/* 主聊天界面 */}
      <Card className="border-l-4 border-l-primary-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-primary-700">实时聊天</CardTitle>
              <CardDescription>与团队成员进行实时沟通交流</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-primary-100 text-primary-800">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                在线
              </Badge>
              <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 group">
                <Settings className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <RealTimeChat
            currentUserId={currentUserId}
            selectedRoomId={selectedRoomId}
            onRoomChange={setSelectedRoomId}
          />
        </CardContent>
      </Card>

      {/* 快捷操作 */}
      <Card className="border-l-4 border-l-primary-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-base text-primary-700">快捷操作</CardTitle>
          <CardDescription>常用聊天功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 group">
              <Plus className="w-6 h-6 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">创建群聊</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary-50 bg-transparent border-l-4 border-l-primary-500 transition-all duration-300 hover:scale-105 group"
            >
              <Users className="w-6 h-6 text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">邀请成员</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary-50 bg-transparent border-l-4 border-l-primary-500 transition-all duration-300 hover:scale-105 group"
            >
              <Search className="w-6 h-6 text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">搜索消息</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary-50 bg-transparent border-l-4 border-l-primary-500 transition-all duration-300 hover:scale-105 group"
            >
              <Settings className="w-6 h-6 text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
              <span className="text-sm">聊天设置</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
