import React from "react";
import type { ChartDataPoint } from "../data/dashboard";

export interface ChartBarProps {
  data: ChartDataPoint[];
  max?: number;
}

export function ChartBar({ data, max: maxProp }: ChartBarProps) {
  const max = maxProp ?? Math.max(...data.map((d) => d.value));
  return (
    <div className="cwr-chart-bar">
      <h3 className="cwr-chart-title">Активность по дням</h3>
      <div className="cwr-chart-bars">
        {data.map((item, index) => (
          <div key={`${item.label}-${index}`} className="cwr-chart-bar-item">
            <div
              className="cwr-chart-bar-fill"
              style={{ height: `${(item.value / max) * 100}%` }}
            />
            <span className="cwr-chart-bar-label">{item.label}</span>
            <span className="cwr-chart-bar-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
