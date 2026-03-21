import {
    ActivityList,
    ChartBar,
    StatsCard,
    applyDashboardView,
    getDashboardData,
    type DashboardMetric,
    type DashboardRange,
    type DashboardSortOrder,
} from "@cwr/shared";
import { MetricIsland } from "./MetricIsland";
import { RangeIsland } from "./RangeIsland";
import { SortIsland } from "./SortIsland";

type SearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0];
  return undefined;
}

function pick<T extends string>(value: string | undefined, allowed: readonly T[], fallback: T): T {
  if (!value) return fallback;
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const data = await getDashboardData();
  const range = pick<DashboardRange>(first(searchParams?.range), ["7d", "30d", "90d"] as const, "7d");
  const metric = pick<DashboardMetric>(
    first(searchParams?.metric),
    ["users", "revenue", "conversion"] as const,
    "users",
  );
  const sortOrder = pick<DashboardSortOrder>(first(searchParams?.sort), ["newest", "oldest"] as const, "newest");

  const view = applyDashboardView(data, { range, metric, sortOrder });
  return (
    <div>
      <h1>Дашборд аналитики</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <RangeIsland />
        <MetricIsland />
        <SortIsland />
      </div>
      <div className="cwr-dashboard-grid">
        <StatsCard title="Всего пользователей" value={view.stats.totalUsers} />
        <StatsCard title="Активных сегодня" value={view.stats.activeToday} />
        <StatsCard title="Конверсия" value={`${view.stats.conversionRate}%`} />
        <StatsCard title="Выручка" value={`${(view.stats.revenue / 1000).toFixed(0)}k ₽`} />
      </div>
      <div className="cwr-dashboard-content">
        <ChartBar data={view.chartData} />
        <ActivityList items={view.recentActivity} />
      </div>
    </div>
  );
}
