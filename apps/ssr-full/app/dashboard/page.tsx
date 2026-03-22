import { fetchRawDashboardDataset } from "@cwr/shared/server";
import { DashboardClient } from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const dataset = await fetchRawDashboardDataset({
    baseUrl: process.env.MOCK_API_BASE_URL,
    points: 5000,
    activities: 5000,
    delayMs: 180,
  });

  return <DashboardClient dataset={dataset} />;
}
