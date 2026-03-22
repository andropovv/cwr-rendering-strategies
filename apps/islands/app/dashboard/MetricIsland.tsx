"use client";

import { useState, useTransition } from "react";
import type { DashboardMetric } from "@cwr/shared/client";
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

export function MetricIsland({ initialMetric }: { initialMetric: DashboardMetric }) {
  const [isPending, startTransition] = useTransition();
  const [metric, setMetric] = useState(initialMetric);

  const update = (next: DashboardMetric) => {
    startTransition(async () => {
      setMetric(next);
      await updateDashboardFiltersAction({ metric: next });
    });
  };

  return (
    <>
      <span style={{ marginLeft: "1rem", fontSize: "0.875rem", color: "#64748b" }}>Метрика:</span>
      <button type="button" onClick={() => update("users")} style={pillStyle(metric === "users")}>
        Пользователи
      </button>
      <button type="button" onClick={() => update("revenue")} style={pillStyle(metric === "revenue")}>
        Выручка
      </button>
      <button type="button" onClick={() => update("conversion")} style={pillStyle(metric === "conversion")}>
        Конверсия
      </button>
      {isPending && (
        <span style={{ marginLeft: "0.75rem", fontSize: "0.8125rem", color: "#94a3b8" }}>
          Обновление…
        </span>
      )}
    </>
  );
}

