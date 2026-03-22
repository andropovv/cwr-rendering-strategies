export { ActivityList } from "./components/ActivityList";
export type { ActivityItem } from "./components/ActivityList";
export { BlogCard } from "./components/BlogCard";
export { BlogPostView } from "./components/BlogPostView";
export { ChartBar } from "./components/ChartBar";
export { Layout } from "./components/Layout";
export { ProductCard } from "./components/ProductCard";
export { ProductPageContent } from "./components/ProductPageContent";
export { StatsCard } from "./components/StatsCard";

export {
    blogPosts, getBlogPostBySlug, getBlogPosts
} from "./data/blog";
export type { BlogPost } from "./data/blog";

export { generateProducts, getProductById, getProducts, products } from "./data/products";
export type { Product } from "./data/products";

export {
    formatRelativeActivityTime, generateLargeDashboardDataset, getDashboardData
} from "./data/dashboard";
export type {
    ChartDataPoint, DashboardActivityItem, DashboardData, DashboardDataset,
    DashboardDatasetOptions, DashboardStats, RawDashboardActivity, RawDashboardPoint
} from "./data/dashboard";

export {
    DEFAULT_MOCK_API_BASE_URL, fetchDashboardViewFromApi, fetchProductFromApi, fetchProductsFromApi, fetchRawDashboardDataset
} from "./api/mockApi";
export type {
    MockApiDatasetOptions,
    MockApiProductOptions
} from "./api/mockApi";
export { DashboardInteractive } from "./client/DashboardInteractive";
export type { DashboardInteractiveProps } from "./client/DashboardInteractive";
export {
    ClientActivityList,
    ClientChartBar,
    ClientProductCard,
    ClientProductPageContent,
    ClientStatsCard
} from "./client/Presentational";
export { ProductControls } from "./client/ProductControls";
export type { ProductControlsProps } from "./client/ProductControls";

export {
    applyDashboardView, type DashboardMetric, type DashboardRange, type DashboardSortOrder, type DashboardViewOptions
} from "./utils/dashboardView";

