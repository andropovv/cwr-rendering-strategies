import type { DashboardData, DashboardDataset } from "../data/dashboard";
import type { Product } from "../data/products";
import type {
  DashboardMetric,
  DashboardRange,
  DashboardSortOrder,
} from "../utils/dashboardView";

const API_BASE = process.env.NEXT_PUBLIC_MOCK_API_URL || 'http://localhost:4010';

export interface MockApiDatasetOptions {
  baseUrl?: string;
  points?: number;
  activities?: number;
  delayMs?: number;
  seed?: number;
}

export interface MockApiProductOptions {
  baseUrl?: string;
  count?: number;
  delayMs?: number;
  limit?: number;
}

function buildUrl(baseUrl: string, path: string, searchParams: Record<string, string | number | undefined>) {
  const url = new URL(path, baseUrl);
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`mock-api request failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

export async function fetchRawDashboardDataset(
  options: MockApiDatasetOptions = {},
): Promise<DashboardDataset> {
  const {
    baseUrl = API_BASE,
    points = 5000,
    activities = 5000,
    delayMs = 150,
    seed = 42,
  } = options;

  const url = buildUrl(baseUrl, "/api/dashboard/raw", {
    points,
    activities,
    delayMs,
    seed,
  });

  const payload = await fetchJson<{ dataset: DashboardDataset }>(url);
  return payload.dataset;
}

export async function fetchDashboardViewFromApi(
  filters: {
    range: DashboardRange;
    metric: DashboardMetric;
    sortOrder: DashboardSortOrder;
  },
  options: MockApiDatasetOptions = {},
): Promise<DashboardData> {
  const {
    baseUrl = API_BASE,
    points = 5000,
    activities = 5000,
    delayMs = 150,
    seed = 42,
  } = options;

  const url = buildUrl(baseUrl, "/api/dashboard/view", {
    points,
    activities,
    delayMs,
    seed,
    range: filters.range,
    metric: filters.metric,
    sort: filters.sortOrder,
  });

  const payload = await fetchJson<{ view: DashboardData }>(url);
  return payload.view;
}

export async function fetchProductsFromApi(
  options: MockApiProductOptions = {},
): Promise<{ items: Product[]; total: number }> {
  const {
    baseUrl = API_BASE,
    count = 1200,
    delayMs = 100,
    limit = 24,
  } = options;

  const url = buildUrl(baseUrl, "/api/products", {
    count,
    delayMs,
    limit,
  });

  return fetchJson<{ items: Product[]; total: number }>(url);
}

export async function fetchProductFromApi(
  id: string,
  options: MockApiProductOptions = {},
): Promise<Product> {
  const {
    baseUrl = API_BASE,
    count = 1200,
    delayMs = 100,
  } = options;

  const url = buildUrl(baseUrl, `/api/products/${id}`, {
    count,
    delayMs,
  });

  const payload = await fetchJson<{ item: Product }>(url);
  return payload.item;
}
