import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type {
    ChartDataPoint,
    DashboardActivityItem,
    DashboardData,
    DashboardDataset,
    DashboardStats,
    RawDashboardPoint,
} from "../data/dashboard";
import { formatRelativeActivityTime } from "../data/dashboard";

export type DashboardRange = "7d" | "30d" | "90d";
export type DashboardMetric = "users" | "revenue" | "conversion";
export type DashboardSortOrder = "newest" | "oldest";

export interface DashboardViewOptions {
  range: DashboardRange;
  metric: DashboardMetric;
  sortOrder: DashboardSortOrder;
}

const RANGE_POINTS: Record<DashboardRange, number> = {
  "7d": 24 * 7,
  "30d": 24 * 30,
  "90d": 24 * 90,
};

function pickPointsForRange(
  points: RawDashboardPoint[],
  range: DashboardRange,
): RawDashboardPoint[] {
  const size = RANGE_POINTS[range];
  return points.slice(-Math.min(size, points.length));
}

function bucketPoints(
  points: RawDashboardPoint[],
  metric: DashboardMetric,
): ChartDataPoint[] {
  const bucketCount = 12;
  const bucketSize = Math.max(1, Math.floor(points.length / bucketCount));
  const result: ChartDataPoint[] = [];

  for (let offset = 0; offset < points.length; offset += bucketSize) {
    const bucket = points.slice(offset, offset + bucketSize);
    if (bucket.length === 0) {
      continue;
    }

    let aggregate = 0;
    for (let index = 0; index < bucket.length; index += 1) {
      const point = bucket[index];
      if (metric === "users") {
        aggregate += point.users;
      } else if (metric === "revenue") {
        aggregate += point.revenue;
      } else {
        aggregate += (point.conversions / point.sessions) * 100;
      }
    }

    const first = bucket[0];
    result.push({
      label: format(new Date(first.timestamp), "d MMM", { locale: ru }),
      value:
        metric === "conversion"
          ? Number((aggregate / bucket.length).toFixed(1))
          : Math.round(aggregate),
    });
  }

  return result;
}

function buildStats(points: RawDashboardPoint[]): DashboardStats {
  let totalUsers = 0;
  let totalRevenue = 0;
  let totalConversions = 0;
  let totalSessions = 0;

  for (let index = 0; index < points.length; index += 1) {
    const point = points[index];
    totalUsers += point.users;
    totalRevenue += point.revenue;
    totalConversions += point.conversions;
    totalSessions += point.sessions;
  }

  return {
    totalUsers,
    activeToday: Math.round(points.slice(-24).reduce((sum, point) => sum + point.users, 0) * 0.33),
    conversionRate:
      totalSessions === 0
        ? 0
        : Number(((totalConversions / totalSessions) * 100).toFixed(1)),
    revenue: totalRevenue,
  };
}

function buildRecentActivity(
  data: DashboardDataset,
  sortOrder: DashboardSortOrder,
): DashboardActivityItem[] {
  const sorted = [...data.activities].sort((a, b) =>
    sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp,
  );

  return sorted.slice(0, 18).map((item) => ({
    id: item.id,
    action: `${item.actor}: ${item.actionType} ${item.entity} #${item.entityId}`,
    time: formatRelativeActivityTime(item.timestamp, data.generatedAt),
  }));
}

export function applyDashboardView(
  dataset: DashboardDataset,
  opts: DashboardViewOptions,
): DashboardData {
  const filteredPoints = pickPointsForRange(dataset.points, opts.range);

  // Несколько проходов по массиву оставляют расчёт реалистичным и
  // заметным для full-hydration сценариев на больших объёмах данных.
  const stats = buildStats(filteredPoints);
  const chartData = bucketPoints(filteredPoints, opts.metric);
  const recentActivity = buildRecentActivity(dataset, opts.sortOrder);

  return {
    stats,
    chartData,
    recentActivity,
  };
}

