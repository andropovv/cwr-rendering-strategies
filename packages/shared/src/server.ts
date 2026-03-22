export { Layout } from "./components/Layout";
export { BlogCard } from "./components/BlogCard";
export { BlogPostView } from "./components/BlogPostView";
export { ProductCard } from "./components/ProductCard";
export { ProductPageContent } from "./components/ProductPageContent";
export { StatsCard } from "./components/StatsCard";
export { ChartBar } from "./components/ChartBar";
export { ActivityList } from "./components/ActivityList";
export type { ActivityItem } from "./components/ActivityList";

export {
  getBlogPosts,
  getBlogPostBySlug,
  blogPosts,
} from "./data/blog";
export type { BlogPost } from "./data/blog";

export {
  generateProducts,
  getProducts,
  getProductById,
  products,
} from "./data/products";
export type { Product } from "./data/products";

export {
  getDashboardData,
  generateLargeDashboardDataset,
  formatRelativeActivityTime,
} from "./data/dashboard";
export type {
  DashboardData,
  DashboardStats,
  ChartDataPoint,
  DashboardDataset,
  DashboardDatasetOptions,
  DashboardActivityItem,
  RawDashboardPoint,
  RawDashboardActivity,
} from "./data/dashboard";

export {
  DEFAULT_MOCK_API_BASE_URL,
  fetchRawDashboardDataset,
  fetchDashboardViewFromApi,
  fetchProductsFromApi,
  fetchProductFromApi,
} from "./api/mockApi";
export type {
  MockApiDatasetOptions,
  MockApiProductOptions,
} from "./api/mockApi";

export {
  applyDashboardView,
  type DashboardViewOptions,
  type DashboardRange,
  type DashboardMetric,
  type DashboardSortOrder,
} from "./utils/dashboardView";
