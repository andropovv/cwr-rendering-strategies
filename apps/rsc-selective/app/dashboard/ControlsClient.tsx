"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type {
  DashboardMetric,
  DashboardRange,
  DashboardSortOrder,
} from "@cwr/shared";

function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  if (!value) return fallback;
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

export function ControlsClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const range = pick<DashboardRange>(sp.get("range"), ["7d", "30d", "90d"] as const, "7d");
  const metric = pick<DashboardMetric>(
    sp.get("metric"),
    ["users", "revenue", "conversion"] as const,
    "users",
  );
  const sortOrder = pick<DashboardSortOrder>(sp.get("sort"), ["newest", "oldest"] as const, "newest");

  const update = (next: { range?: DashboardRange; metric?: DashboardMetric; sort?: DashboardSortOrder }) => {
    const params = new URLSearchParams(sp.toString());
    if (next.range) params.set("range", next.range);
    if (next.metric) params.set("metric", next.metric);
    if (next.sort) params.set("sort", next.sort);
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
      <button type="button" onClick={() => update({ sort: "newest" })} style={pillStyle(sortOrder === "newest")}>
        Сначала новые
      </button>
      <button type="button" onClick={() => update({ sort: "oldest" })} style={pillStyle(sortOrder === "oldest")}>
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

