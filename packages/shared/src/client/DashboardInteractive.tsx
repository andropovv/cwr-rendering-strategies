"use client";

import { useState, useTransition } from "react";
import {
  StatsCard,
} from "../components/StatsCard";
import { ChartBar } from "../components/ChartBar";
import { ActivityList } from "../components/ActivityList";
import type { DashboardData } from "../data/dashboard";
import {
  applyDashboardView,
  type DashboardMetric,
  type DashboardRange,
  type DashboardSortOrder,
} from "../utils/dashboardView";

export interface DashboardInteractiveProps {
  data: DashboardData;
}

export function DashboardInteractive({ data }: DashboardInteractiveProps) {
  const { stats } = data;

  const [range, setRange] = useState<DashboardRange>("7d");
  const [metric, setMetric] = useState<DashboardMetric>("users");
  const [sortOrder, setSortOrder] = useState<DashboardSortOrder>("newest");
  const [isPending, startTransition] = useTransition();

  const handleRangeChange = (next: DashboardRange) => {
    if (next === range) return;
    startTransition(() => {
      setRange(next);
    });
  };

  const handleMetricChange = (next: DashboardMetric) => {
    if (next === metric) return;
    startTransition(() => {
      setMetric(next);
    });
  };

  const handleSortChange = (next: DashboardSortOrder) => {
    if (next === sortOrder) return;
    startTransition(() => {
      setSortOrder(next);
    });
  };

  const view = applyDashboardView(data, { range, metric, sortOrder });

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <span style={{ fontSize: "0.875rem", color: "#64748b" }}>
          Период:
        </span>
        <button
          type="button"
          onClick={() => handleRangeChange("7d")}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid #e2e8f0",
            background: range === "7d" ? "#0f172a" : "white",
            color: range === "7d" ? "white" : "#0f172a",
            cursor: "pointer",
            fontSize: "0.8125rem",
          }}
        >
          7 дней
        </button>
        <button
          type="button"
          onClick={() => handleRangeChange("30d")}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid #e2e8f0",
            background: range === "30d" ? "#0f172a" : "white",
            color: range === "30d" ? "white" : "#0f172a",
            cursor: "pointer",
            fontSize: "0.8125rem",
          }}
        >
          30 дней
        </button>
        <button
          type="button"
          onClick={() => handleRangeChange("90d")}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid #e2e8f0",
            background: range === "90d" ? "#0f172a" : "white",
            color: range === "90d" ? "white" : "#0f172a",
            cursor: "pointer",
            fontSize: "0.8125rem",
          }}
        >
          90 дней
        </button>

        <span
          style={{
            marginLeft: "1rem",
            fontSize: "0.875rem",
            color: "#64748b",
          }}
        >
          Метрика:
        </span>
        <button
          type="button"
          onClick={() => handleMetricChange("users")}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid #e2e8f0",
            background: metric === "users" ? "#0f172a" : "white",
            color: metric === "users" ? "white" : "#0f172a",
            cursor: "pointer",
            fontSize: "0.8125rem",
          }}
        >
          Пользователи
        </button>
        <button
          type="button"
          onClick={() => handleMetricChange("revenue")}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid #e2e8f0",
            background: metric === "revenue" ? "#0f172a" : "white",
            color: metric === "revenue" ? "white" : "#0f172a",
            cursor: "pointer",
            fontSize: "0.8125rem",
          }}
        >
          Выручка
        </button>
        <button
          type="button"
          onClick={() => handleMetricChange("conversion")}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid #e2e8f0",
            background: metric === "conversion" ? "#0f172a" : "white",
            color: metric === "conversion" ? "white" : "#0f172a",
            cursor: "pointer",
            fontSize: "0.8125rem",
          }}
        >
          Конверсия
        </button>

        <span
          style={{
            marginLeft: "1rem",
            fontSize: "0.875rem",
            color: "#64748b",
          }}
        >
          Активность:
        </span>
        <button
          type="button"
          onClick={() => handleSortChange("newest")}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid #e2e8f0",
            background: sortOrder === "newest" ? "#0f172a" : "white",
            color: sortOrder === "newest" ? "white" : "#0f172a",
            cursor: "pointer",
            fontSize: "0.8125rem",
          }}
        >
          Сначала новые
        </button>
        <button
          type="button"
          onClick={() => handleSortChange("oldest")}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid #e2e8f0",
            background: sortOrder === "oldest" ? "#0f172a" : "white",
            color: sortOrder === "oldest" ? "white" : "#0f172a",
            cursor: "pointer",
            fontSize: "0.8125rem",
          }}
        >
          Сначала старые
        </button>

        {isPending && (
          <span
            style={{
              marginLeft: "0.75rem",
              fontSize: "0.8125rem",
              color: "#94a3b8",
            }}
          >
            Обновление…
          </span>
        )}
      </div>

      <div className="cwr-dashboard-grid">
        <StatsCard title="Всего пользователей" value={stats.totalUsers} />
        <StatsCard title="Активных сегодня" value={stats.activeToday} />
        <StatsCard
          title="Конверсия"
          value={`${stats.conversionRate}%`}
        />
        <StatsCard
          title="Выручка"
          value={`${(stats.revenue / 1000).toFixed(0)}k ₽`}
        />
      </div>

      <div className="cwr-dashboard-content">
        <ChartBar data={view.chartData} />
        <ActivityList items={view.recentActivity} />
      </div>
    </div>
  );
}

