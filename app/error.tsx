'use client';

import Footer from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="site-header-inner">
          <a href="/" className="site-logo">InternX 投遞戰情室</a>
        </div>
      </header>

      <main className="error-page">
        <h1>500</h1>
        <h2>發生了一點問題</h2>
        <p>系統發生非預期的錯誤，請嘗試重新整理頁面。</p>
        {error.digest && (
          <p style={{ fontSize: '0.75rem', color: 'var(--ink-2)' }}>錯誤代碼：{error.digest}</p>
        )}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 4 }}>
          <button type="button" className="btn-primary" onClick={reset}>重試</button>
          <a href="/" className="btn-ghost" style={{ textDecoration: 'none' }}>回首頁</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
