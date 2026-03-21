import type { Metadata } from "next";
import { Layout } from "@cwr/shared";
import "@cwr/shared/styles/layout.css";
import "@cwr/shared/styles/content.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CWR — Islands",
  description: "Конфигурация 4: гибридный подход, архитектура островов",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Layout strategy="Islands">{children}</Layout>
      </body>
    </html>
  );
}
