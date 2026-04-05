export { DashboardInteractive } from "./client/DashboardInteractive";
export type { DashboardInteractiveProps } from "./client/DashboardInteractive";

export {
  ClientActivityList,
  ClientChartBar,
  ClientProductPageContent,
  ClientStatsCard,
} from "./client/Presentational";
export { ProductExperienceDetails } from "./components/ProductExperienceDetails";

export { ProductControls } from "./client/ProductControls";
export type { ProductControlsProps } from "./client/ProductControls";
export { ProductPurchasePanel } from "./client/ProductPurchasePanel";

export type {
  DashboardDataset,
  DashboardData,
  DashboardStats,
  ChartDataPoint,
  DashboardActivityItem,
} from "./data/dashboard";
export type {
  DeliveryOption,
  Product,
  ProductExperienceData,
  ProductReview,
  ProductSpec,
  ProductVariantOption,
} from "./data/products";

export type {
  DashboardRange,
  DashboardMetric,
  DashboardSortOrder,
  DashboardViewOptions,
} from "./utils/dashboardView";
export {
  buildProductExperienceData,
  calculateProductPurchaseSummary,
  getInitialProductPurchaseState,
} from "./utils/productExperience";
export type {
  ProductPurchaseState,
  ProductPurchaseSummary,
} from "./utils/productExperience";
