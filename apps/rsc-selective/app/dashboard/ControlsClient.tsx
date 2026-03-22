"use client";

import { useState, useTransition } from "react";
import type {
  DashboardMetric,
  DashboardRange,
  DashboardSortOrder,
} from "@cwr/shared/client";
import { updateDashboardFiltersAction } from "./actions";

const pillStyle = (active: boolean) =>
  ({
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
    border: "1px solid #e2e8f0",
    background: active ? "#0f172a" : "white",
    color: active ? "white" : "#0f172a",
    cursor: "pointer",
    fontSize: "0.8125rem",
  }) as const;

export function ControlsClient({
  initialRange,
  initialMetric,
  initialSortOrder,
}: {
  initialRange: DashboardRange;
  initialMetric: DashboardMetric;
  initialSortOrder: DashboardSortOrder;
}) {
  const [isPending, startTransition] = useTransition();
  const [range, setRange] = useState(initialRange);
  const [metric, setMetric] = useState(initialMetric);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const update = (next: {
    range?: DashboardRange;
    metric?: DashboardMetric;
    sortOrder?: DashboardSortOrder;
  }) => {
    startTransition(async () => {
      if (next.range) {
        setRange(next.range);
      }
      if (next.metric) {
        setMetric(next.metric);
      }
      if (next.sortOrder) {
        setSortOrder(next.sortOrder);
      }
      await updateDashboardFiltersAction(next);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <span style={{ fontSize: "0.875rem", color: "#64748b" }}>Период:</span>
      <button type="button" onClick={() => update({ range: "7d" })} style={pillStyle(range === "7d")}>
        7 дней
      </button>
      <button type="button" onClick={() => update({ range: "30d" })} style={pillStyle(range === "30d")}>
        30 дней
      </button>
      <button type="button" onClick={() => update({ range: "90d" })} style={pillStyle(range === "90d")}>
        90 дней
      </button>

      <span style={{ marginLeft: "1rem", fontSize: "0.875rem", color: "#64748b" }}>Метрика:</span>
      <button type="button" onClick={() => update({ metric: "users" })} style={pillStyle(metric === "users")}>
        Пользователи
      </button>
      <button type="button" onClick={() => update({ metric: "revenue" })} style={pillStyle(metric === "revenue")}>
        Выручка
      </button>
      <button
        type="button"
        onClick={() => update({ metric: "conversion" })}
        style={pillStyle(metric === "conversion")}
      >
        Конверсия
      </button>

      <span style={{ marginLeft: "1rem", fontSize: "0.875rem", color: "#64748b" }}>Активность:</span>
      <button
        type="button"
        onClick={() => update({ sortOrder: "newest" })}
        style={pillStyle(sortOrder === "newest")}
      >
        Сначала новые
      </button>
      <button
        type="button"
        onClick={() => update({ sortOrder: "oldest" })}
        style={pillStyle(sortOrder === "oldest")}
      >
        Сначала старые
      </button>

      {isPending && (
        <span style={{ marginLeft: "0.75rem", fontSize: "0.8125rem", color: "#94a3b8" }}>
          Обновление…
        </span>
      )}
    </div>
  );
}

