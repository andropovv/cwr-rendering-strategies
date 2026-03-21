"use client";

import { useRouter } from "next/navigation";

export function RefreshIsland() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.refresh()}
      style={{
        padding: "0.5rem 1rem",
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "0.875rem",
      }}
    >
      Обновить
    </button>
  );
}
