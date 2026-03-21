import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Конфигурация 4: Islands (гибрид)</h1>
      <p>
        Максимум контента — серверный HTML; только небольшие островки
        интерактивности (кнопки, формы) гидратируются на клиенте.
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
