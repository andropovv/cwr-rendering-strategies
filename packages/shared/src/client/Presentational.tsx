"use client";

import type { ChartDataPoint, DashboardActivityItem } from "../data/dashboard";
import type { Product } from "../data/products";
import type { ProductPurchaseSummary } from "../utils/productExperience";
import { DashboardChartSvg } from "../components/DashboardChartSvg";

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
  return <DashboardChartSvg data={data} />;
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

export function ClientProductPageContent({
  product,
  summary,
}: {
  product: Product;
  summary?: ProductPurchaseSummary;
}) {
  const displayPrice = summary?.unitPrice ?? product.price;

  return (
    <div className="cwr-product-page">
      <div className="cwr-product-page-image">{product.image}</div>
      <div className="cwr-product-page-info">
        <div className="cwr-product-page-kicker">{product.category}</div>
        <h1 className="cwr-product-page-title">{product.name}</h1>
        <p className="cwr-product-page-desc">{product.description}</p>
        <div className="cwr-product-page-price">
          {displayPrice.toLocaleString("ru-RU")} {product.currency}
        </div>
        <div className="cwr-product-page-rating">
          ★ {product.rating} • {product.reviewCount} отзывов
        </div>
        {summary && (
          <div className="cwr-product-page-meta">
            <span
              className="cwr-product-variant-badge"
              style={{ background: `${summary.selectedVariant.accent}14`, color: summary.selectedVariant.accent }}
            >
              {summary.selectedVariant.label}
            </span>
            <span>{summary.inventoryLabel}</span>
            <span>{summary.deliveryLabel}</span>
            <span>от {summary.monthlyInstallment.toLocaleString("ru-RU")} ₽/мес</span>
          </div>
        )}
      </div>
    </div>
  );
}
