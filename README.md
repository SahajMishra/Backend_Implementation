# Vehicle Scheduling API (Express.js)

Simple student-level project for depot task scheduling using **0/1 Knapsack**.

## What this does

- Fetches depot and vehicle task data from the provided APIs
- Calculates best task selection for each depot under `MechanicHours`
- Returns:
  - `depotId`
  - `totalImpact`
  - `tasksSelected`
- Writes logs to:
  - evaluation log API
  - local `server.log` file

## Project Structure

- `project/app.js`
- `project/routes/scheduleRoutes.js`
- `project/controllers/scheduleController.js`
- `project/services/apiService.js`
- `project/services/knapsackService.js`
- `project/utils/logger.js`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set token (PowerShell):

```powershell
$env:EVALUATION_TOKEN="your-token"
$env:LOG_TOKEN="your-token"   # optional, if needed for log API
```

3. Run server:

```bash
nodemon server.js
```

## API Endpoints

- `GET /api/schedule/health`
  - health check

- `POST /api/schedule/optimize`
  - runs scheduling for all depots
  - can use live API data (with token)

- `GET /api/schedule/last-run`
  - returns result from latest successful optimize run

## Quick Test (PowerShell)

```powershell
curl.exe http://localhost:3000/api/schedule/health
curl.exe -X POST http://localhost:3000/api/schedule/optimize -H "Content-Type: application/json" -d "{}"
curl.exe http://localhost:3000/api/schedule/last-run
```

## Notes

- Algorithm used: **0/1 Knapsack**
- If token is missing, optimize can use mock body format:
  - `depots.depots`
  - `vehicles.vehicles`
