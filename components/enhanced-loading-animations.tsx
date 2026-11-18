/**
 * @file enhanced-loading-animations.tsx
 * @description enhanced-loading-animations component/module for YYC3 Customer Care Center
 * @module components.enhanced-loading-animations
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

interface LoadingAnimationProps {
  type?: 'pulse' | 'spin' | 'bounce' | 'wave' | 'dots' | 'progress'
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'purple' | 'orange'
  text?: string
  showProgress?: boolean
  progress?: number
}

export function EnhancedLoadingAnimation({
  type = 'pulse',
  size = 'md',
  color = 'blue',
  text,
  showProgress = false,
  progress = 0,
}: LoadingAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const colorClasses = {
    blue: 'from-primary-400 to-primary-600',
    green: 'from-success-400 to-success-600',
    purple: 'from-accent-400 to-accent-600',
    orange: 'from-warning-400 to-warning-600',
  };

  const renderAnimation = () => {
    switch (type) {
    case 'pulse':
      return (
        <div className={`${sizeClasses[size]} bg-gradient-to-r ${colorClasses[color]} rounded-full animate-pulse`}>
          <div className="w-full h-full bg-white rounded-full animate-ping opacity-75"></div>
        </div>
      );

    case 'spin':
      return (
        <div className={`${sizeClasses[size]} relative`}>
          <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} rounded-full animate-spin`}>
            <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-white rounded-full transform -translate-x-1/2"></div>
          </div>
        </div>
      );

    case 'bounce':
      return (
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 bg-gradient-to-r ${colorClasses[color]} rounded-full animate-bounce`}
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      );

    case 'wave':
      return (
        <div className="flex items-end space-x-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-2 bg-gradient-to-t ${colorClasses[color]} rounded-full transition-all duration-300`}
              style={{
                height: `${20 + Math.sin((animationPhase + i) * 0.5) * 10}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      );

    case 'dots':
      return (
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 bg-gradient-to-r ${colorClasses[color]} rounded-full transition-opacity duration-500`}
              style={{
                opacity: animationPhase === i ? 1 : 0.3,
              }}
            ></div>
          ))}
        </div>
      );

    case 'progress':
      return (
        <div className="w-32 h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-300 ease-out`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      );

    default:
      return (
        <div
          className={`${sizeClasses[size]} bg-gradient-to-r ${colorClasses[color]} rounded-full animate-pulse`}
        ></div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {renderAnimation()}
      {text && <p className="text-sm text-neutral-600 animate-pulse">{text}</p>}
      {showProgress && <div className="text-xs text-neutral-500">{progress.toFixed(0)}%</div>}
    </div>
  );
}

// 智能提示组件
export function SmartLoadingTips({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const tips = [
    '💡 系统正在优化数据库连接以提供更快的响应速度',
    '🔧 正在配置本地存储，确保离线时也能正常使用',
    '🔄 同步服务启动中，您的数据将在所有设备间保持一致',
    '🔐 身份验证系统正在加载，保护您的数据安全',
    '📊 业务模块准备中，即将为您提供完整的管理功能',
    '🎨 用户界面优化中，为您打造最佳的使用体验',
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    setCurrentTip(currentStep);
  }, [currentStep]);

  return (
    <Card className="mt-4 border-primary-100 bg-primary-50">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-600 text-sm font-medium">{currentStep + 1}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-primary-800 leading-relaxed">
              {tips[currentTip] || '系统正在进行最后的准备工作...'}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex-1 h-1 bg-primary-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-primary-600 font-medium">
                {currentStep + 1}/{totalSteps}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 系统状态指示器
export function SystemStatusIndicator({
  status,
  message,
  details,
}: {
  status: 'initializing' | 'ready' | 'error' | 'offline'
  message: string
  details?: string
}) {
  const statusConfig = {
    initializing: {
      color: 'blue',
      icon: '🔄',
      bgColor: 'bg-primary-50 border-primary-200',
      textColor: 'text-primary-800',
    },
    ready: {
      color: 'green',
      icon: '✅',
      bgColor: 'bg-success-50 border-success-200',
      textColor: 'text-success-800',
    },
    error: {
      color: 'red',
      icon: '❌',
      bgColor: 'bg-danger-50 border-danger-200',
      textColor: 'text-danger-800',
    },
    offline: {
      color: 'orange',
      icon: '📱',
      bgColor: 'bg-warning-50 border-warning-200',
      textColor: 'text-warning-800',
    },
  };

  const config = statusConfig[status];

  return (
    <Card className={`border ${config.bgColor}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{config.icon}</span>
          <div className="flex-1">
            <h3 className={`font-medium ${config.textColor}`}>{message}</h3>
            {details && <p className={`text-sm mt-1 ${config.textColor} opacity-80`}>{details}</p>}
          </div>
          {status === 'initializing' && <EnhancedLoadingAnimation type="spin" size="sm" color={config.color as any} />}
        </div>
      </CardContent>
    </Card>
  );
}
