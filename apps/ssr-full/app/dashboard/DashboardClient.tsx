"use client";

import { DashboardInteractive, type DashboardDataset } from "@cwr/shared/client";

export function DashboardClient({ dataset }: { dataset: DashboardDataset }) {
  return <DashboardInteractive dataset={dataset} />;
}
