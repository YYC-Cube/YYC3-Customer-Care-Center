import * as Sentry from '@sentry/nextjs';

/**
 * @file sentry.server.config.ts
 * @description Server-side Sentry configuration（Sentry 11 API）
 * @module sentry.server.config
 * @author YYC³ Team
 * @version 2.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 *
 * Sentry 11: Integrations.Http / Integrations.Express 已由 SDK 自动注册，
 * 无需手动实例化。
 */

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development',
  tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'),

  beforeSend(event) {
    if (event.exception) {
      event.fingerprint = ['{{ default }}', String(event.request?.url)];
    }
    return event;
  },

  beforeBreadcrumb(breadcrumb) {
    if (breadcrumb.category === 'http' && breadcrumb.data?.url) {
      const url = new URL(breadcrumb.data.url);
      if (url.pathname.includes('/api/health')) return null;
    }
    return breadcrumb;
  },

  ignoreErrors: [
    'Non-Error promise rejection captured',
    'ResizeObserver loop limit exceeded',
    'Network request failed',
  ],

  denyUrls: [
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
    /^moz-extension:\/\//i,
  ],
});

export default Sentry;
