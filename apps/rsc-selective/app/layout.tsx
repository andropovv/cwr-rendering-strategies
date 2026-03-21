import type { Metadata } from "next";
import { Layout } from "@cwr/shared";
import "@cwr/shared/styles/layout.css";
import "@cwr/shared/styles/content.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CWR — RSC + выборочная гидратация",
  description: "Конфигурация 3: React Server Components, гидратируются только интерактивные части",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Layout strategy="RSC + выборочная гидратация">{children}</Layout>
      </body>
    </html>
  );
}
