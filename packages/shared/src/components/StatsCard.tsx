import React from "react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <div className="cwr-stats-card">
      <div className="cwr-stats-card-title">{title}</div>
      <div className="cwr-stats-card-value">{value}</div>
      {subtitle && <div className="cwr-stats-card-subtitle">{subtitle}</div>}
    </div>
  );
}
