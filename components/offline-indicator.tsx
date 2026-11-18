/**
 * @file offline-indicator.tsx
 * @description offline-indicator component/module for YYC3 Customer Care Center
 * @module components.offline-indicator
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Wifi, AlertCircle } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);

      if (!online) {
        setShowIndicator(true);
      } else {
        // 延迟隐藏指示器，让用户看到连接恢复
        setTimeout(() => setShowIndicator(false), 2000);
      }
    };

    // 初始状态检查
    updateOnlineStatus();

    // 监听网络状态变化
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (!showIndicator) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <Card className={`${isOnline ? 'bg-success-50 border-success-200' : 'bg-warning-50 border-warning-200'} shadow-lg`}>
        <CardContent className="px-4 py-2">
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-success-600" />
                <span className="text-sm font-medium text-success-800">网络连接已恢复</span>
                <Badge variant="outline" className="bg-success-100 text-success-700 border-success-300">
                  在线
                </Badge>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-warning-600" />
                <span className="text-sm font-medium text-warning-800">网络连接断开</span>
                <Badge variant="outline" className="bg-warning-100 text-warning-700 border-warning-300">
                  离线
                </Badge>
              </>
            )}
          </div>
          {!isOnline && (
            <div className="flex items-center space-x-1 mt-1">
              <AlertCircle className="w-3 h-3 text-warning-500" />
              <span className="text-xs text-warning-600">正在使用缓存数据</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
