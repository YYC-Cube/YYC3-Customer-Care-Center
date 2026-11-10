/**
 * @file system-analysis-report.tsx
 * @description 系统分析报告占位组件 —— 原模块缺失致构建失败，先以占位恢复构建，
 *              后续可在此渲染完整分析报告数据。
 */

export function SystemAnalysisReport() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-geist-sans, sans-serif)',
      }}
    >
      <div style={{ textAlign: 'center', padding: 32 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>系统分析报告</h1>
        <p style={{ color: '#888', fontSize: 14 }}>
          报告数据模块生成中 —— 此页面为构建恢复占位（docs/system-analysis-report 缺失修复）。
        </p>
      </div>
    </div>
  )
}
