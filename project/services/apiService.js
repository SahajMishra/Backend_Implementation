const BASE =
  process.env.EVALUATION_SERVICE_URL ||
  "http://20.207.122.201/evaluation-service";

function authHeaders() {
  const token =
    process.env.EVALUATION_TOKEN || process.env.LOG_TOKEN || "";
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function getJson(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { headers: { ...authHeaders() } });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`${path}: invalid JSON (${res.status})`);
  }
  if (!res.ok) {
    throw new Error(`${path}: HTTP ${res.status} — ${text.slice(0, 200)}`);
  }
  return data;
}

/** Normalize depot list from API or mock body */
function normalizeDepots(raw) {
  if (Array.isArray(raw?.depots)) return raw.depots;
  if (Array.isArray(raw)) return raw;
  throw new Error("Depots response: expected { depots: [...] } or [...]");
}

/** Normalize tasks / vehicles list */
function normalizeTasks(raw) {
  if (Array.isArray(raw?.vehicles)) return raw.vehicles;
  if (Array.isArray(raw?.tasks)) return raw.tasks;
  if (Array.isArray(raw)) return raw;
  throw new Error("Vehicles response: expected { vehicles: [...] } or similar");
}

/**
 * Loads depots + tasks from evaluation APIs (protected).
 * Falls back to POST body shape from egs/Calutor if no token is set (local testing).
 */
export async function loadSchedulingInput(body = {}) {
  const hasToken = Boolean(
    process.env.EVALUATION_TOKEN || process.env.LOG_TOKEN
  );

  if (hasToken) {
    const [depotsRaw, vehiclesRaw] = await Promise.all([
      getJson("/depots"),
      getJson("/vehicles"),
    ]);
    return {
      depots: normalizeDepots(depotsRaw),
      tasks: normalizeTasks(vehiclesRaw),
    };
  }

  const depots = body?.depots?.depots;
  const vehicles = body?.vehicles?.vehicles;
  if (Array.isArray(depots) && Array.isArray(vehicles)) {
    return { depots, tasks: vehicles };
  }

  throw new Error(
    "Set EVALUATION_TOKEN (or LOG_TOKEN) for live APIs, or POST mock JSON with depots.depots and vehicles.vehicles"
  );
}
