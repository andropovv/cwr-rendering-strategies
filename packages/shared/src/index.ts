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

export { getProducts, getProductById, products } from "./data/products";
export type { Product } from "./data/products";

export {
  getDashboardStats,
  getChartData,
  getRecentActivity,
  getDashboardData,
} from "./data/dashboard";
export type { DashboardData, DashboardStats, ChartDataPoint } from "./data/dashboard";

export { DashboardInteractive } from "./client/DashboardInteractive";
export type { DashboardInteractiveProps } from "./client/DashboardInteractive";
export { ProductControls } from "./client/ProductControls";
export type { ProductControlsProps } from "./client/ProductControls";

export {
  applyDashboardView,
  type DashboardViewOptions,
  type DashboardRange,
  type DashboardMetric,
  type DashboardSortOrder,
} from "./utils/dashboardView";
