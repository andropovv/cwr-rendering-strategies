import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Конфигурация 1: SSR + полная гидратация</h1>
      <p>
        Вся страница отрендерена на сервере и полностью гидратируется на клиенте
        (единое клиентское дерево).
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
