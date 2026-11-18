'use client';

/**
 * @file sheet.tsx
 * @description 侧滑面板（shadcn 受控 API 兼容：open/onOpenChange + side）——原模块缺失，自包含实现。
 */

import { createContext, useContext, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface SheetContextValue {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SheetContext = createContext<SheetContextValue>({ open: false });

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  // 触发器必须始终渲染：可见性由 SheetContent 自身按 open 控制
  return <SheetContext.Provider value={{ open, onOpenChange }}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({ children }: { children: ReactNode; asChild?: boolean }) {
  const { onOpenChange } = useContext(SheetContext);
  return (
    <span className="contents" onClick={() => onOpenChange?.(true)}>
      {children}
    </span>
  );
}

const sideCls: Record<string, string> = {
  left: 'left-0 top-0 h-full w-80 border-r border-border',
  right: 'right-0 top-0 h-full w-80 border-l border-border',
  top: 'left-0 top-0 h-80 w-full border-b border-border',
  bottom: 'left-0 bottom-0 w-full border-t border-border',
};

export function SheetContent({
  side = 'right',
  className = '',
  children,
}: {
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  children: ReactNode;
}) {
  const { open, onOpenChange } = useContext(SheetContext);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* 遮罩：点击关闭 */}
      <div
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`absolute z-10 bg-card text-card-foreground p-6 shadow-xl ${sideCls[side] || sideCls.right} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
          onClick={() => onOpenChange?.(false)}
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`flex flex-col space-y-2 ${className}`}>{children}</div>;
}

export function SheetTitle({ className = '', children }: { className?: string; children: ReactNode }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function SheetDescription({ className = '', children }: { className?: string; children: ReactNode }) {
  return <p className={`text-sm text-neutral-500 ${className}`}>{children}</p>;
}

export function SheetClose({
  className = '',
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useContext(SheetContext);
  return (
    <button
      type="button"
      className={`rounded-md border border-border px-3 py-1.5 text-sm ${className}`}
      onClick={(event) => {
        onClick?.(event);
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
