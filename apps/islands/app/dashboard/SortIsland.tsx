"use client";

import type { DashboardSortOrder } from "@cwr/shared/client";
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

export function SortIsland({ initialSortOrder }: { initialSortOrder: DashboardSortOrder }) {
  const [isPending, startTransition] = useTransition();
  const [sort, setSort] = useState(initialSortOrder);

  const update = (next: DashboardSortOrder) => {
    startTransition(async () => {
      setSort(next);
      await updateDashboardFiltersAction({ sortOrder: next });
    });
  };

  return (
    <>
      <span style={{ marginLeft: "1rem", fontSize: "0.875rem", color: "#64748b" }}>Активность:</span>
      <button type="button" onClick={() => update("newest")} style={pillStyle(sort === "newest")}>
        Сначала новые
      </button>
      <button type="button" onClick={() => update("oldest")} style={pillStyle(sort === "oldest")}>
        Сначала старые
      </button>
      {isPending && (
        <span style={{ marginLeft: "0.75rem", fontSize: "0.8125rem", color: "#94a3b8" }}>
          Обновление…
        </span>
      )}
    </>
  );
}

