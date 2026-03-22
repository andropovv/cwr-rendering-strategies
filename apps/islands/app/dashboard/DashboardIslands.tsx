"use client";

import dynamic from "next/dynamic";
import type {
  DashboardMetric,
  DashboardRange,
  DashboardSortOrder,
} from "@cwr/shared/client";

const RangeIsland = dynamic(
  () => import("./RangeIsland").then((module) => module.RangeIsland),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ width: 300, height: 34, borderRadius: 999, background: "#f1f5f9" }}
      />
    ),
  },
);

const MetricIsland = dynamic(
  () => import("./MetricIsland").then((module) => module.MetricIsland),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ width: 380, height: 34, borderRadius: 999, background: "#f1f5f9" }}
      />
    ),
  },
);

const SortIsland = dynamic(
  () => import("./SortIsland").then((module) => module.SortIsland),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ width: 300, height: 34, borderRadius: 999, background: "#f1f5f9" }}
      />
    ),
  },
);

export function DashboardIslands({
  range,
  metric,
  sortOrder,
}: {
  range: DashboardRange;
  metric: DashboardMetric;
  sortOrder: DashboardSortOrder;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        alignItems: "center",
        marginBottom: "1rem",
        minHeight: "42px",
      }}
    >
      <RangeIsland initialRange={range} />
      <MetricIsland initialMetric={metric} />
      <SortIsland initialSortOrder={sortOrder} />
    </div>
  );
}
