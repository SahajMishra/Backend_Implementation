import { loadSchedulingInput } from "../services/apiService.js";
import { scheduleDepots } from "../services/knapsackService.js";
import { log } from "../utils/logger.js";

let lastRun = {
  ranAt: null,
  depotsProcessed: 0,
  result: [],
};

export async function optimize(req, res) {
  try {
    await log("backend", "info", "controller", "Scheduling started");
    const { depots, tasks } = await loadSchedulingInput(req.body);
    const data = scheduleDepots(depots, tasks);
    lastRun = {
      ranAt: new Date().toISOString(),
      depotsProcessed: data.length,
      result: data,
    };
    await log(
      "backend",
      "info",
      "controller",
      `Scheduling completed for ${data.length} depots`
    );
    await log("backend", "info", "controller", `Scheduling result: ${JSON.stringify(data)}`);
    res.json({ success: true, data });
  } catch (err) {
    await log("backend", "error", "controller", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
}

export function health(_req, res) {
  res.json({
    success: true,
    service: "vehicle-scheduling",
    status: "ok",
    time: new Date().toISOString(),
  });
}

export function getLastRun(_req, res) {
  res.json({
    success: true,
    data: lastRun,
  });
}
