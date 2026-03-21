import type { Metadata } from "next";
import { Layout } from "@cwr/shared";
import "@cwr/shared/styles/layout.css";
import "@cwr/shared/styles/content.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CWR — SSR + полная гидратация",
  description: "Конфигурация 1: базовый SSR с полной гидратацией",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Layout strategy="SSR + полная гидратация">{children}</Layout>
      </body>
    </html>
  );
}
