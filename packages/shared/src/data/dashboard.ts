export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface DashboardStats {
  totalUsers: number;
  activeToday: number;
  conversionRate: number;
  revenue: number;
}

export interface DashboardActivityItem {
  id: string;
  action: string;
  time: string;
}

export interface DashboardData {
  stats: DashboardStats;
  chartData: ChartDataPoint[];
  recentActivity: DashboardActivityItem[];
}

export interface RawDashboardPoint {
  id: string;
  timestamp: number;
  users: number;
  revenue: number;
  conversions: number;
  sessions: number;
}

export interface RawDashboardActivity {
  id: string;
  timestamp: number;
  actor: string;
  actionType: string;
  entity: string;
  entityId: number;
}

export interface DashboardDataset {
  generatedAt: number;
  points: RawDashboardPoint[];
  activities: RawDashboardActivity[];
}

export interface DashboardDatasetOptions {
  pointCount?: number;
  activityCount?: number;
  seed?: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const DEFAULT_POINT_COUNT = 5000;
const DEFAULT_ACTIVITY_COUNT = 5000;

function mulberry32(seed: number) {
  let value = seed;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateLargeDashboardDataset(
  options: DashboardDatasetOptions = {},
): DashboardDataset {
  const {
    pointCount = DEFAULT_POINT_COUNT,
    activityCount = DEFAULT_ACTIVITY_COUNT,
    seed = 42,
  } = options;
  const rand = mulberry32(seed);
  const now = Date.UTC(2026, 1, 17, 12, 0, 0);

  const points: RawDashboardPoint[] = [];
  for (let index = 0; index < pointCount; index += 1) {
    const ageFactor = pointCount - index;
    const timestamp = now - ageFactor * HOUR_MS;
    const weekday = new Date(timestamp).getUTCDay();
    const isWeekend = weekday === 0 || weekday === 6;
    const seasonal = 1 + Math.sin(index / 17) * 0.24 + Math.cos(index / 37) * 0.18;
    const trafficBase = isWeekend ? 720 : 1060;
    const sessions = Math.max(
      120,
      Math.round(trafficBase * seasonal + rand() * 240 + (index % 48) * 8),
    );
    const conversions = Math.max(8, Math.round(sessions * (0.024 + rand() * 0.028)));
    const users = Math.max(60, Math.round(sessions * (0.64 + rand() * 0.22)));
    const revenue = Math.round(conversions * (950 + rand() * 2600));

    points.push({
      id: `point-${index + 1}`,
      timestamp,
      users,
      revenue,
      conversions,
      sessions,
    });
  }

  const actors = ["Анна", "Игорь", "Мария", "Лев", "Ольга", "Тимур", "Алиса"];
  const actions = [
    "Создан заказ",
    "Оплачена подписка",
    "Регистрация пользователя",
    "Обновлен отчёт",
    "Экспортирована выгрузка",
    "Создан лид",
    "Оставлен отзыв",
  ];
  const entities = ["заказ", "подписка", "пользователь", "отчёт", "лид", "товар"];
  const activities: RawDashboardActivity[] = [];

  for (let index = 0; index < activityCount; index += 1) {
    const timestamp = now - index * Math.max(30_000, Math.round(rand() * 3 * HOUR_MS));
    activities.push({
      id: `activity-${index + 1}`,
      timestamp,
      actor: actors[index % actors.length],
      actionType: actions[index % actions.length],
      entity: entities[index % entities.length],
      entityId: 1000 + ((index * 17) % 9000),
    });
  }

  return {
    generatedAt: now,
    points,
    activities,
  };
}

export function formatRelativeActivityTime(timestamp: number, now: number): string {
  const diffMinutes = Math.max(1, Math.round((now - timestamp) / (60 * 1000)));
  if (diffMinutes < 60) {
    return `${diffMinutes} мин назад`;
  }
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} ч назад`;
  }
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} дн назад`;
}

export function getDashboardData(): DashboardData {
  const dataset = generateLargeDashboardDataset({
    pointCount: 168,
    activityCount: 48,
  });
  const points = dataset.points.slice(-24);
  const totalUsers = points.reduce((sum, point) => sum + point.users, 0);
  const totalRevenue = points.reduce((sum, point) => sum + point.revenue, 0);
  const totalConversions = points.reduce((sum, point) => sum + point.conversions, 0);
  const totalSessions = points.reduce((sum, point) => sum + point.sessions, 0);

  return {
    stats: {
      totalUsers,
      activeToday: Math.round(totalUsers * 0.27),
      conversionRate: Number(((totalConversions / totalSessions) * 100).toFixed(1)),
      revenue: totalRevenue,
    },
    chartData: points.slice(-7).map((point) => ({
      label: new Date(point.timestamp).toLocaleDateString("ru-RU", {
        weekday: "short",
      }),
      value: point.users,
    })),
    recentActivity: dataset.activities.slice(0, 6).map((item) => ({
      id: item.id,
      action: `${item.actionType}: ${item.entity} #${item.entityId}`,
      time: formatRelativeActivityTime(item.timestamp, dataset.generatedAt),
    })),
  };
}
