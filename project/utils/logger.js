/**
 * Sends logs to the evaluation API.
 * stack: backend | frontend
 * level: debug | info | warn | error | fatal
 * pkg: cache | controller | cron_job | db | domain (backend)
 */
const LOG_URL =
  process.env.LOG_URL ||
  "http://20.207.122.201/evaluation-service/logs";

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
