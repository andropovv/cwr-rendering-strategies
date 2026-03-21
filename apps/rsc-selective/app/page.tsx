import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Конфигурация 3: RSC + выборочная гидратация</h1>
      <p>
        Компоненты по умолчанию — серверные; только интерактивные островки
        помечены &quot;use client&quot; и гидратируются.
      </p>
      <ul>
        <li>
          <Link href="/blog">Блог</Link>
        </li>
        <li>
          <Link href="/product/1">Товар</Link>
        </li>
        <li>
          <Link href="/dashboard">Дашборд</Link>
        </li>
      </ul>
    </div>
  );
}
