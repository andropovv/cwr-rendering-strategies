import type { Metadata } from "next";
import { Layout } from "@cwr/shared";
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
        <Layout strategy="Streaming SSR">{children}</Layout>
      </body>
    </html>
  );
}
