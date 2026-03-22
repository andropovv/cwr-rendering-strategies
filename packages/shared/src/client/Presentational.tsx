"use client";

import type { ChartDataPoint, DashboardActivityItem } from "../data/dashboard";
import type { Product } from "../data/products";

export function ClientStatsCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <div className="cwr-stats-card">
      <div className="cwr-stats-card-title">{title}</div>
      <div className="cwr-stats-card-value">{value}</div>
      {subtitle && <div className="cwr-stats-card-subtitle">{subtitle}</div>}
    </div>
  );
}

export function ClientChartBar({ data }: { data: ChartDataPoint[] }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className="cwr-chart-bar">
      <h3 className="cwr-chart-title">Активность по дням</h3>
      <div className="cwr-chart-bars">
        {data.map((item, index) => (
          <div key={index} className="cwr-chart-bar-item">
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

export function ClientActivityList({ items }: { items: DashboardActivityItem[] }) {
  return (
    <div className="cwr-activity-list">
      <h3 className="cwr-activity-title">Последняя активность</h3>
      <ul className="cwr-activity-items">
        {items.map((item) => (
          <li key={item.id} className="cwr-activity-item">
            <span className="cwr-activity-action">{item.action}</span>
            <span className="cwr-activity-time">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ClientProductCard({ product }: { product: Product }) {
  return (
    <div className="cwr-product-card">
      <div className="cwr-product-card-image">{product.image}</div>
      <h3 className="cwr-product-card-name">{product.name}</h3>
      <p className="cwr-product-card-desc">{product.description}</p>
      <div className="cwr-product-card-price">
        {product.price.toLocaleString("ru-RU")} {product.currency}
      </div>
      <div className="cwr-product-card-rating">
        ★ {product.rating} ({product.reviewCount} отзывов)
      </div>
    </div>
  );
}

export function ClientProductPageContent({ product }: { product: Product }) {
  return (
    <div className="cwr-product-page">
      <div className="cwr-product-page-image">{product.image}</div>
      <div className="cwr-product-page-info">
        <h1 className="cwr-product-page-title">{product.name}</h1>
        <p className="cwr-product-page-desc">{product.description}</p>
        <div className="cwr-product-page-price">
          {product.price.toLocaleString("ru-RU")} {product.currency}
        </div>
        <div className="cwr-product-page-rating">
          ★ {product.rating} • {product.reviewCount} отзывов
        </div>
      </div>
    </div>
  );
}
