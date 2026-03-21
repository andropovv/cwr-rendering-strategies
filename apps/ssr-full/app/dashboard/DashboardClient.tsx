"use client";

import { DashboardInteractive, type DashboardData } from "@cwr/shared";

export function DashboardClient({ data }: { data: DashboardData }) {
  return <DashboardInteractive data={data} />;
}
