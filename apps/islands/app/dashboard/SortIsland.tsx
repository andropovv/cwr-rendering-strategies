"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { DashboardSortOrder } from "@cwr/shared";

function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  if (!value) return fallback;
  return (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

export function SortIsland() {
  const router = useRouter();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const sort = pick<DashboardSortOrder>(sp.get("sort"), ["newest", "oldest"] as const, "newest");

  const update = (next: DashboardSortOrder) => {
    const params = new URLSearchParams(sp.toString());
    params.set("sort", next);
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

