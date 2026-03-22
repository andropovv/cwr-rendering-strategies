import { Router } from "express";
import { generateProducts } from "@cwr/shared/server";

const router = Router();

function parseNumber(value: unknown, fallback: number): number {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) {
    return fallback;
  }
  return Math.floor(num);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

router.get("/", async (req, res) => {
  const count = parseNumber(req.query.count, 1200);
  const limit = parseNumber(req.query.limit, 24);
  const delayMs = parseNumber(req.query.delayMs, 80);

  await wait(delayMs);

  const products = generateProducts(count);

  res.json({
    items: products.slice(0, limit),
    total: products.length,
    meta: {
      delayMs,
      count,
      limit,
    },
  });
});

router.get("/:id", async (req, res) => {
  const count = parseNumber(req.query.count, 1200);
  const delayMs = parseNumber(req.query.delayMs, 80);

  await wait(delayMs);

  const products = generateProducts(count);
  const product = products.find((item) => item.id === req.params.id);

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json({
    item: product,
    meta: {
      delayMs,
      count,
    },
  });
});

export default router;
