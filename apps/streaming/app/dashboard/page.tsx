import { Suspense } from "react";
import { DashboardInteractive, getDashboardData } from "@cwr/shared";

async function DashboardBlock() {
  const data = await getDashboardData();
  return <DashboardInteractive data={data} />;
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Дашборд аналитики</h1>
      <Suspense fallback={<p>Загрузка дашборда…</p>}>
        <DashboardBlock />
      </Suspense>
    </div>
  );
}
