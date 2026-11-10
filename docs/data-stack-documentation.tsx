/**
 * @file data-stack-documentation.tsx
 * @description 数据栈文档占位组件 —— 原模块缺失致构建失败，先以占位恢复构建，
 *              后续可在此渲染完整数据栈文档。
 */

export function DataStackDocumentation() {
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
        <div style={{ fontSize: 40, marginBottom: 12 }}>🗃</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>数据栈文档</h1>
        <p style={{ color: '#888', fontSize: 14 }}>
          文档数据模块生成中 —— 此页面为构建恢复占位（docs/data-stack-documentation 缺失修复）。
        </p>
      </div>
    </div>
  )
}
