import type { DashboardData } from "../data/dashboard";

export type DashboardRange = "7d" | "30d" | "90d";
export type DashboardMetric = "users" | "revenue" | "conversion";
export type DashboardSortOrder = "newest" | "oldest";

export interface DashboardViewOptions {
  range: DashboardRange;
  metric: DashboardMetric;
  sortOrder: DashboardSortOrder;
}

export function applyDashboardView(
  data: DashboardData,
  opts: DashboardViewOptions,
): DashboardData {
  const { range, metric, sortOrder } = opts;
  const { stats, chartData, recentActivity } = data;

  const scaledChart = chartData.map((point) => {
    let value = point.value;

    // имитация разных метрик на одном наборе данных
    if (metric === "revenue") {
      value = value * 1.7;
    } else if (metric === "conversion") {
      value = value * 0.03;
    }

    if (range === "30d") {
      value = value * 1.5;
    } else if (range === "90d") {
      value = value * 2;
    }

    return { ...point, value: Math.round(value) };
  });

  const sortedActivity = [...recentActivity].sort((a, b) => {
    const idA = Number(a.id);
    const idB = Number(b.id);
    if (Number.isNaN(idA) || Number.isNaN(idB)) return 0;
    return sortOrder === "newest" ? idB - idA : idA - idB;
  });

  return {
    stats,
    chartData: scaledChart,
    recentActivity: sortedActivity,
  };
}

