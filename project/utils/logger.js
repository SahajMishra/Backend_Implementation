/**
 * Sends logs to the evaluation API.
 * stack: backend | frontend
 * level: debug | info | warn | error | fatal
 * pkg: cache | controller | cron_job | db | domain (backend)
 */
import { appendFile } from "node:fs/promises";

const LOG_URL =
  process.env.LOG_URL ||
  "http://20.207.122.201/evaluation-service/logs";
const LOCAL_LOG_PATH = process.env.LOCAL_LOG_PATH || "server.log";

const STACKS = new Set(["backend", "frontend"]);
const LEVELS = new Set(["debug", "info", "warn", "error", "fatal"]);
const PACKAGES = new Set([
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
]);

export async function log(stack, level, pkg, message) {
  const s = String(stack).toLowerCase();
  const l = String(level).toLowerCase();
  const p = String(pkg).toLowerCase();

  if (!STACKS.has(s) || !LEVELS.has(l) || !PACKAGES.has(p)) {
    console.error("[logger] bad stack/level/package:", s, l, p);
    return;
  }

  const headers = { "Content-Type": "application/json" };
  if (process.env.LOG_TOKEN) {
    headers.Authorization = `Bearer ${process.env.LOG_TOKEN}`;
  }

  const localLine = `[${new Date().toISOString()}] [${s}] [${l}] [${p}] ${String(message)}\n`;
  try {
    await appendFile(LOCAL_LOG_PATH, localLine, "utf8");
  } catch (e) {
    console.error("[logger] local file write failed:", e.message);
  }

  try {
    const res = await fetch(LOG_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        stack: s,
        level: l,
        package: p,
        message: String(message),
      }),
    });
    if (!res.ok) {
      console.error("[logger] HTTP", res.status, await res.text());
    }
  } catch (e) {
    console.error("[logger] request failed:", e.message);
  }
}
