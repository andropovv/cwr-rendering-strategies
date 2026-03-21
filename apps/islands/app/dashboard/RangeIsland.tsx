"use client";

import type { DashboardRange } from "@cwr/shared";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  if (!value) return fallback;
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

export function RangeIsland() {
  const router = useRouter();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const range = pick<DashboardRange>(sp.get("range"), ["7d", "30d", "90d"] as const, "7d");

  const update = (next: DashboardRange) => {
    const params = new URLSearchParams(sp.toString());
    params.set("range", next);
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

