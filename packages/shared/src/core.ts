export {
  generateProducts,
  getProductById,
  getProducts,
  products,
} from "./data/products";
export type {
  DeliveryOption,
  Product,
  ProductExperienceData,
  ProductReview,
  ProductSpec,
  ProductVariantOption,
} from "./data/products";

export {
  formatRelativeActivityTime,
  generateLargeDashboardDataset,
  getDashboardData,
} from "./data/dashboard";
export type {
  ChartDataPoint,
  DashboardActivityItem,
  DashboardData,
  DashboardDataset,
  DashboardDatasetOptions,
  DashboardStats,
  RawDashboardActivity,
  RawDashboardPoint,
} from "./data/dashboard";

export {
  applyDashboardView,
  type DashboardMetric,
  type DashboardRange,
  type DashboardSortOrder,
  type DashboardViewOptions,
} from "./utils/dashboardView";

export {
  buildProductExperienceData,
  calculateProductPurchaseSummary,
  formatProductReviewDate,
  getInitialProductPurchaseState,
} from "./utils/productExperience";
export type {
  ProductPurchaseState,
  ProductPurchaseSummary,
} from "./utils/productExperience";
