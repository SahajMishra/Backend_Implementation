import exp from 'express';

app=exp();

app.post("/optimize", (req, res) => {
    const depots = req.body.depots.depots;
    const vehicles = req.body.vehicles.vehicles;

    const result = solve(depots, vehicles);

    res.json({
        success: true,
        data: result
    });
});





function solve(depots, vehicles) {
    const results = [];

    for (let depot of depots) {
        const maxImpact = knapsack(depot.MechanicHours, vehicles);

        results.push({
            depotId: depot.ID,
            maxImpact: maxImpact
        });
    }

    return results;
}




function knapsack(capacity, tasks) {
    const dp = new Array(capacity + 1).fill(0);

    for (let i = 0; i < tasks.length; i++) {
        const { Duration, Impact } = tasks[i];

        for (let w = capacity; w >= Duration; w--) {
            const include = Impact + dp[w - Duration];
            const exclude = dp[w];
            dp[w] = Math.max(include, exclude);
        }
    }

    return dp[capacity];
}