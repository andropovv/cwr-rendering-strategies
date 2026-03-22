import { Router } from "express";
import {
  applyDashboardView,
  generateLargeDashboardDataset,
  type DashboardMetric,
  type DashboardRange,
  type DashboardSortOrder,
} from "@cwr/shared/server";

const router = Router();

function parseNumber(value: unknown, fallback: number): number {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) {
    return fallback;
  }
  return Math.floor(num);
}

function parseRange(value: unknown): DashboardRange {
  return value === "30d" || value === "90d" ? value : "7d";
}

function parseMetric(value: unknown): DashboardMetric {
  return value === "revenue" || value === "conversion" ? value : "users";
}

function parseSort(value: unknown): DashboardSortOrder {
  return value === "oldest" ? value : "newest";
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

router.get("/raw", async (req, res) => {
  const points = parseNumber(req.query.points, 5000);
  const activities = parseNumber(req.query.activities, 5000);
  const seed = parseNumber(req.query.seed, 42);
  const delayMs = parseNumber(req.query.delayMs, 120);

  await wait(delayMs);

  const dataset = generateLargeDashboardDataset({
    pointCount: points,
    activityCount: activities,
    seed,
  });

  res.json({
    dataset,
    meta: {
      points: dataset.points.length,
      activities: dataset.activities.length,
      delayMs,
    },
  });
});

router.get("/view", async (req, res) => {
  const points = parseNumber(req.query.points, 5000);
  const activities = parseNumber(req.query.activities, 5000);
  const seed = parseNumber(req.query.seed, 42);
  const delayMs = parseNumber(req.query.delayMs, 120);
  const range = parseRange(req.query.range);
  const metric = parseMetric(req.query.metric);
  const sortOrder = parseSort(req.query.sort);

  await wait(delayMs);

  const dataset = generateLargeDashboardDataset({
    pointCount: points,
    activityCount: activities,
    seed,
  });
  const view = applyDashboardView(dataset, { range, metric, sortOrder });

  res.json({
    view,
    filters: {
      range,
      metric,
      sortOrder,
    },
    meta: {
      points: dataset.points.length,
      activities: dataset.activities.length,
      delayMs,
    },
  });
});

export default router;
