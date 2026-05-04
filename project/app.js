import express from "express";
import scheduleRoutes from "./routes/scheduleRoutes.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("vehicle scheduling API — POST /api/schedule/optimize");
});

app.use("/api/schedule", scheduleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
