export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  date: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "core-web-vitals-optimization",
    title: "Оптимизация Core Web Vitals в современных фреймворках",
    excerpt: "Обзор методов улучшения LCP, INP и CLS с помощью адаптивного рендеринга.",
    body: "Core Web Vitals стали ключевым фактором ранжирования. В статье рассмотрены стратегии серверного рендеринга, потоковой доставки контента и выборочной гидратации для снижения блокирующего времени и улучшения метрик взаимодействия.",
    author: "Кузнецов А.В.",
    date: "2026-02-15",
  },
  {
    id: "2",
    slug: "streaming-ssr-react",
    title: "Streaming SSR и React Server Components",
    excerpt: "Практическое сравнение потокового рендеринга и классического SSR.",
    body: "Потоковый серверный рендеринг позволяет отправлять HTML частями, что сокращает время до первой отрисовки. React Server Components дополняют эту модель, уменьшая объём клиентского JavaScript за счёт выполнения компонентов на сервере.",
    author: "Иванов П.С.",
    date: "2026-02-10",
  },
  {
    id: "3",
    slug: "selective-hydration-patterns",
    title: "Паттерны выборочной гидратации",
    excerpt: "Как отложить гидратацию второстепенных компонентов для ускорения INP.",
    body: "Выборочная гидратация предполагает приоритизацию интерактивных областей страницы. Критичные компоненты гидратируются первыми, остальные — по мере необходимости или при взаимодействии пользователя.",
    author: "Петрова М.К.",
    date: "2026-02-05",
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
