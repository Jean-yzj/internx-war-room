import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '找不到頁面 | InternX 投遞戰情室',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="site-header-inner">
          <a href="/" className="site-logo">InternX 投遞戰情室</a>
        </div>
      </header>

      <main className="error-page">
        <h1>404</h1>
        <h2>找不到這個頁面</h2>
        <p>你要找的頁面不存在，可能已移除或網址輸入錯誤。</p>
        <a href="/" className="btn-primary" style={{ textDecoration: 'none' }}>回首頁</a>
      </main>

      <Footer />
    </div>
  );
}
