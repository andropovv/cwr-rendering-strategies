import {
    ActivityList,
    ChartBar,
    StatsCard,
  fetchDashboardViewFromApi,
} from "@cwr/shared/server";
import { readDashboardFilterState } from "./actions";
import { DashboardIslands } from "./DashboardIslands";

export default async function DashboardPage({
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = await readDashboardFilterState();
  const view = await fetchDashboardViewFromApi(filters, {
    baseUrl: process.env.MOCK_API_BASE_URL,
    points: 5000,
    activities: 5000,
    delayMs: 150,
  });

  return (
    <div>
      <h1>Дашборд аналитики</h1>
      <DashboardIslands
        range={filters.range}
        metric={filters.metric}
        sortOrder={filters.sortOrder}
      />
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
