'use client';

/**
 * @file enhanced-card.tsx
 * @description 增强卡片（title/description/footer 提升常用区块）——原模块缺失，本文件为恢复构建的兼容实现。
 */

import { forwardRef } from 'react';

export interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  variant?: 'default' | 'glass' | 'gradient';
}

const variantCls: Record<string, string> = {
  default: 'bg-card text-card-foreground shadow-sm',
  glass: 'bg-white/10 backdrop-blur border border-white/20',
  gradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-700',
};

export const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className = '', title, description, footer, bordered = true, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-xl ${variantCls[variant] || variantCls.default} ${bordered && variant === 'default' ? 'border' : ''} ${className}`}
        {...props}
      >
        {(title || description) && (
          <div className="flex flex-col space-y-1.5 p-6">
            {title ? <h3 className="font-semibold leading-none tracking-tight">{title}</h3> : null}
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
        )}
        {children ? <div className="p-6 pt-0">{children}</div> : null}
        {footer ? <div className="flex items-center p-6 pt-0">{footer}</div> : null}
      </div>
    );
  },
);
EnhancedCard.displayName = 'EnhancedCard';
