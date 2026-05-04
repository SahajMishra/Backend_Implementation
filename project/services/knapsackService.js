/**
 * 0/1 knapsack with reconstruction of chosen tasks.
 * Keeps this intentionally simple and student-friendly.
 */
export function knapsackSelectTasks(capacity, tasks) {
  const n = tasks.length;
  const cap = Number(capacity) || 0;
  const dp = Array.from({ length: n + 1 }, () => new Array(cap + 1).fill(0));
  const keep = Array.from({ length: n + 1 }, () => new Array(cap + 1).fill(false));

  for (let i = 1; i <= n; i++) {
    const task = tasks[i - 1];
    const duration = Number(task.Duration) || 0;
    const impact = Number(task.Impact) || 0;

    for (let w = 0; w <= cap; w++) {
      dp[i][w] = dp[i - 1][w];
      if (duration > 0 && duration <= w) {
        const withCurrent = impact + dp[i - 1][w - duration];
        if (withCurrent > dp[i][w]) {
          dp[i][w] = withCurrent;
          keep[i][w] = true;
        }
      }
    }
  }

  const tasksSelected = [];
  let w = cap;
  for (let i = n; i >= 1; i--) {
    if (keep[i][w]) {
      const task = tasks[i - 1];
      tasksSelected.push(task.TaskID ?? `task${i}`);
      w -= Number(task.Duration) || 0;
    }
  }
  tasksSelected.reverse();

  return { totalImpact: dp[n][cap], tasksSelected };
}

/** Run knapsack per depot using shared task list (same as your Calutor flow). */
export function scheduleDepots(depots, tasks) {
  const results = [];
  for (const depot of depots) {
    const hours = depot.MechanicHours ?? depot.mechanicHours;
    const { totalImpact, tasksSelected } = knapsackSelectTasks(hours, tasks);
    results.push({
      depotId: depot.ID ?? depot.id,
      totalImpact,
      tasksSelected,
    });
  }
  return results;
}
