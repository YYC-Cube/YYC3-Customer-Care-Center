/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.v0.app',
      },
    ],
    unoptimized: true,
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
    ],
  },

  poweredByHeader: false,
  compress: true,

  env: {
    BUILD_TIME: new Date().toISOString(),
  },

  // Next 16 默认 Turbopack：原 webpack 的 fs/net/tls fallback 已无引用，移除
  turbopack: {},

  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // STATIC_EXPORT=true 时走静态导出；默认 standalone（Docker/Vercel 不受影响）
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : 'standalone',

  staticPageGenerationTimeout: 180,

  // 类型错误已清零（2026-11-18），构建期恢复类型校验
  typescript: {
    ignoreBuildErrors: false,
  },

  // 安全响应头统一定义于 proxy.ts（next.config.headers() 与 Proxy 叠加时不生效）
};

export default nextConfig;
