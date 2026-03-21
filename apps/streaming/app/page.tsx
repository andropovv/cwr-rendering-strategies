import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Конфигурация 2: Streaming SSR</h1>
      <p>
        HTML отправляется частями (потоком); критические части отображаются
        раньше; гидратация прогрессивная за счёт Suspense.
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
