/**
 * Plug in real depot/task API URLs and parsing here when you have them.
 * For now this supports the same POST body shape as your Calutor example.
 */
export async function loadSchedulingInput(body) {
  // TODO: replace with fetch(DEPOT_URL) / fetch(TASK_URL) when ready
  const depots = body?.depots?.depots;
  const vehicles = body?.vehicles?.vehicles;

  if (!Array.isArray(depots) || !Array.isArray(vehicles)) {
    throw new Error("Expected body.depots.depots and body.vehicles.vehicles arrays");
  }

  return { depots, tasks: vehicles };
}
