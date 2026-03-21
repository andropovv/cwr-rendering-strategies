"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { DashboardMetric } from "@cwr/shared";

function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  if (!value) return fallback;
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

export function MetricIsland() {
  const router = useRouter();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const metric = pick<DashboardMetric>(
    sp.get("metric"),
    ["users", "revenue", "conversion"] as const,
    "users",
  );

  const update = (next: DashboardMetric) => {
    const params = new URLSearchParams(sp.toString());
    params.set("metric", next);
    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  };

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

