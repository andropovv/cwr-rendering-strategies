import { Suspense } from "react";
import {
  ActivityList,
  ChartBar,
  applyDashboardView,
  fetchRawDashboardDataset,
} from "@cwr/shared/server";
import { DashboardInteractive as ClientDashboardInteractive } from "@cwr/shared/client";

export const dynamic = "force-dynamic";

async function StreamedStatsPreview() {
  const dataset = await fetchRawDashboardDataset({
    baseUrl: process.env.MOCK_API_BASE_URL,
    points: 5000,
    activities: 5000,
    delayMs: 70,
  });
  const preview = applyDashboardView(dataset, {
    range: "7d",
    metric: "users",
    sortOrder: "newest",
  });

  return (
    <div className="cwr-dashboard-content" style={{ marginBottom: "1rem" }}>
      <ChartBar data={preview.chartData.slice(0, 6)} />
      <ActivityList items={preview.recentActivity.slice(0, 6)} />
    </div>
  );
}

async function InteractiveDashboardBlock() {
  const dataset = await fetchRawDashboardDataset({
    baseUrl: process.env.MOCK_API_BASE_URL,
    points: 5000,
    activities: 5000,
    delayMs: 180,
  });
  return <ClientDashboardInteractive dataset={dataset} />;
}

async function StreamedInsightBlock() {
  const dataset = await fetchRawDashboardDataset({
    baseUrl: process.env.MOCK_API_BASE_URL,
    points: 1200,
    activities: 2400,
    delayMs: 110,
  });
  const preview = applyDashboardView(dataset, {
    range: "30d",
    metric: "revenue",
    sortOrder: "newest",
  });

  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem 1.25rem",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        background: "#f8fafc",
      }}
    >
      <strong>Streaming insight:</strong> сервер отдал превью раньше полной
      гидратации. Пиковая выручка по окну:{" "}
      {Math.max(...preview.chartData.map((point) => point.value)).toLocaleString("ru-RU")} ₽
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Дашборд аналитики</h1>
      <Suspense fallback={<p>Загрузка серверного превью…</p>}>
        <StreamedStatsPreview />
      </Suspense>
      <Suspense fallback={<p>Готовим интерактивный дашборд…</p>}>
        <InteractiveDashboardBlock />
      </Suspense>
      <Suspense fallback={<p>Досчитываем вторичный инсайт…</p>}>
        <StreamedInsightBlock />
      </Suspense>
    </div>
  );
}
