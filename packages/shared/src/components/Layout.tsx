import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
  strategy?: string;
}

export function Layout({ children, strategy }: LayoutProps) {
  return (
    <div className="cwr-layout">
      <header className="cwr-header">
        <a href="/" className="cwr-logo">
          CWR Research
        </a>
        <nav className="cwr-nav">
          <a href="/blog">Блог</a>
          <a href="/product">Товар</a>
          <a href="/dashboard">Дашборд</a>
        </nav>
        {strategy && (
          <span className="cwr-strategy-badge" title="Стратегия рендеринга">
            {strategy}
          </span>
        )}
      </header>
      <main className="cwr-main">{children}</main>
      <footer className="cwr-footer">
        <p>Исследование адаптивных стратегий рендеринга • Core Web Vitals</p>
      </footer>
    </div>
  );
}
