import type { ChartDataPoint } from "../data/dashboard";
import { DashboardChartSvg } from "./DashboardChartSvg";

export interface ChartBarProps {
  data: ChartDataPoint[];
}

export function ChartBar({ data }: ChartBarProps) {
  return <DashboardChartSvg data={data} />;
}
