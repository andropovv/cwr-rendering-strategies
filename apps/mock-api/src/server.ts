import cors from "cors";
import express from "express";
import dashboardRoutes from "./routes/dashboard";
import productRoutes from "./routes/products";

const app = express();
const port = Number(process.env.PORT ?? 4010);

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "mock-api",
    endpoints: [
      "/health",
      "/api/dashboard/raw",
      "/api/dashboard/view",
      "/api/products",
      "/api/products/:id",
    ],
  });
});

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "mock-api",
  });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`mock-api listening on http://localhost:${port}`);
  });
}

export default app;
