/**
 * 0/1 knapsack: maximize total Impact within MechanicHours (capacity).
 * Each task: { Duration, Impact } — adjust names when your API shape is fixed.
 */
export function knapsackMaxScore(capacity, tasks) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < tasks.length; i++) {
    const duration = tasks[i].Duration;
    const impact = tasks[i].Impact;
    if (duration <= 0) continue;

    for (let w = capacity; w >= duration; w--) {
      dp[w] = Math.max(dp[w], impact + dp[w - duration]);
    }
  }

  return dp[capacity];
}

/** Run knapsack per depot using shared task list (same as your Calutor flow). */
export function scheduleDepots(depots, tasks) {
  const results = [];
  for (const depot of depots) {
    const hours = depot.MechanicHours ?? depot.mechanicHours;
    const maxImpact = knapsackMaxScore(Number(hours) || 0, tasks);
    results.push({
      depotId: depot.ID ?? depot.id,
      maxImpact,
    });
  }
  return results;
}
