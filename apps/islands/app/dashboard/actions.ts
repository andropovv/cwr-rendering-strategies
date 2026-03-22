"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type {
  DashboardMetric,
  DashboardRange,
  DashboardSortOrder,
} from "@cwr/shared/server";

const RANGE_COOKIE = "islands-dashboard-range";
const METRIC_COOKIE = "islands-dashboard-metric";
const SORT_COOKIE = "islands-dashboard-sort";

export interface DashboardFilterState {
  range: DashboardRange;
  metric: DashboardMetric;
  sortOrder: DashboardSortOrder;
}

export async function updateDashboardFiltersAction(
  nextState: Partial<DashboardFilterState>,
): Promise<void> {
  const cookieStore = await cookies();

  if (nextState.range) {
    cookieStore.set(RANGE_COOKIE, nextState.range, { path: "/" });
  }
  if (nextState.metric) {
    cookieStore.set(METRIC_COOKIE, nextState.metric, { path: "/" });
  }
  if (nextState.sortOrder) {
    cookieStore.set(SORT_COOKIE, nextState.sortOrder, { path: "/" });
  }

  revalidatePath("/dashboard");
}

export async function readDashboardFilterState(): Promise<DashboardFilterState> {
  const cookieStore = await cookies();
  const rangeValue = cookieStore.get(RANGE_COOKIE)?.value;
  const metricValue = cookieStore.get(METRIC_COOKIE)?.value;
  const sortValue = cookieStore.get(SORT_COOKIE)?.value;

  return {
    range: rangeValue === "30d" || rangeValue === "90d" ? rangeValue : "7d",
    metric:
      metricValue === "revenue" || metricValue === "conversion"
        ? metricValue
        : "users",
    sortOrder: sortValue === "oldest" ? sortValue : "newest",
  };
}
