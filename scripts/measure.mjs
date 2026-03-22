import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import waitOn from "wait-on";

const appName = process.argv[2];

if (!appName) {
  console.error("Usage: node scripts/measure.mjs <ssr-full|streaming|rsc-selective|islands>");
  process.exit(1);
}

const ports = {
  "ssr-full": 3101,
  streaming: 3102,
  "rsc-selective": 3103,
  islands: 3104,
};

if (!(appName in ports)) {
  console.error(`Unknown app "${appName}"`);
  process.exit(1);
}

const appPort = ports[appName];
const rootDir = process.cwd();
const reportsDir = path.join(rootDir, "reports", appName);
const runs = Number(process.env.RUNS ?? "5");
const targetPath = process.env.TARGET_PATH ?? "/dashboard";
const targetUrl = `http://127.0.0.1:${appPort}${targetPath}`;
const appDir = path.join(rootDir, "apps", appName);
const mockApiDir = path.join(rootDir, "apps", "mock-api");

await mkdir(reportsDir, { recursive: true });

function runCommand(command, args, cwd = rootDir, extraEnv = {}) {
  return spawn(command, args, {
    cwd,
    env: {
      ...process.env,
      ...extraEnv,
    },
    stdio: "inherit",
  });
}

function waitForExit(child) {
  return new Promise((resolve) => {
    child.on("exit", (code, signal) => {
      resolve({ code, signal });
    });
  });
}

const mockApi = runCommand("node", ["dist/server.js"], mockApiDir, {
  PORT: "4010",
});
const appServer = runCommand(
  "npx",
  ["next", "start", "--hostname", "127.0.0.1", "-p", String(appPort)],
  appDir,
);

const cleanup = async () => {
  mockApi.kill("SIGTERM");
  appServer.kill("SIGTERM");
  await Promise.all([waitForExit(mockApi), waitForExit(appServer)]);
};

process.on("SIGINT", async () => {
  await cleanup();
  process.exit(130);
});

process.on("SIGTERM", async () => {
  await cleanup();
  process.exit(143);
});

await waitOn({
  resources: [
    "http://127.0.0.1:4010/health",
    targetUrl,
  ],
  timeout: 120000,
});

for (let index = 1; index <= runs; index += 1) {
  const outputPath = path.join(reportsDir, `${appName}-${index}.json`);
  const args = [
    "lighthouse",
    targetUrl,
    "--config-path=./lighthouserc.mobile.json",
    "--output=json",
    `--output-path=${outputPath}`,
    "--quiet",
    "--chrome-flags=--headless=new",
  ];

  const result = await waitForExit(runCommand("npx", args));
  if (result.code !== 0) {
    console.error(`Lighthouse run ${index} failed.`);
    await cleanup();
    process.exit(result.code ?? 1);
  }
}

await cleanup();
console.log(`Saved ${runs} report(s) to ${reportsDir}`);
