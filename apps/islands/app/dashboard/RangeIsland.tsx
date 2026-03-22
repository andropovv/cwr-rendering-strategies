"use client";

import type { DashboardRange } from "@cwr/shared/client";
import { useState, useTransition } from "react";
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

export function RangeIsland({ initialRange }: { initialRange: DashboardRange }) {
  const [isPending, startTransition] = useTransition();
  const [range, setRange] = useState(initialRange);

  const update = (next: DashboardRange) => {
    startTransition(async () => {
      setRange(next);
      await updateDashboardFiltersAction({ range: next });
    });
  };

  return (
    <>
      <span style={{ fontSize: "0.875rem", color: "#64748b" }}>Период:</span>
      <button type="button" onClick={() => update("7d")} style={pillStyle(range === "7d")}>
        7 дней
      </button>
      <button type="button" onClick={() => update("30d")} style={pillStyle(range === "30d")}>
        30 дней
      </button>
      <button type="button" onClick={() => update("90d")} style={pillStyle(range === "90d")}>
        90 дней
      </button>
      {isPending && (
        <span style={{ marginLeft: "0.75rem", fontSize: "0.8125rem", color: "#94a3b8" }}>
          Обновление…
        </span>
      )}
    </>
  );
}

