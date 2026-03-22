import type { Metadata } from "next";
import "@cwr/shared/styles/layout.css";
import "@cwr/shared/styles/content.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CWR — Streaming SSR",
  description: "Конфигурация 2: потоковый SSR с прогрессивной гидратацией",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
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
            <span className="cwr-strategy-badge">Streaming SSR</span>
          </header>
          <main className="cwr-main">{children}</main>
          <footer className="cwr-footer">
            <p>Исследование адаптивных стратегий рендеринга • Core Web Vitals</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
