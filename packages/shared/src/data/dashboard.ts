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

export interface DashboardData {
  stats: DashboardStats;
  chartData: ChartDataPoint[];
  recentActivity: { id: string; action: string; time: string }[];
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(100);
  return {
    totalUsers: 12450,
    activeToday: 3421,
    conversionRate: 3.2,
    revenue: 892000,
  };
}

export async function getChartData(): Promise<ChartDataPoint[]> {
  await delay(150);
  return [
    { label: "Пн", value: 1200 },
    { label: "Вт", value: 1900 },
    { label: "Ср", value: 1500 },
    { label: "Чт", value: 2100 },
    { label: "Пт", value: 1800 },
    { label: "Сб", value: 2400 },
    { label: "Вс", value: 2200 },
  ];
}

export async function getRecentActivity(): Promise<{ id: string; action: string; time: string }[]> {
  await delay(80);
  return [
    { id: "1", action: "Новый заказ #4521", time: "2 мин назад" },
    { id: "2", action: "Регистрация пользователя", time: "5 мин назад" },
    { id: "3", action: "Оплата подписки", time: "12 мин назад" },
    { id: "4", action: "Отмена заказа #4518", time: "18 мин назад" },
    { id: "5", action: "Новый отзыв на товар", time: "25 мин назад" },
  ];
}

export async function getDashboardData(): Promise<DashboardData> {
  const [stats, chartData, recentActivity] = await Promise.all([
    getDashboardStats(),
    getChartData(),
    getRecentActivity(),
  ]);
  return { stats, chartData, recentActivity };
}
