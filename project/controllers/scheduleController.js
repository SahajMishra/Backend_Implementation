import { loadSchedulingInput } from "../services/apiService.js";
import { scheduleDepots } from "../services/knapsackService.js";
import { log } from "../utils/logger.js";

export async function optimize(req, res) {
  try {
    const { depots, tasks } = await loadSchedulingInput(req.body);
    const data = scheduleDepots(depots, tasks);
    res.json({ success: true, data });
  } catch (err) {
    await log("backend", "error", "controller", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
}
