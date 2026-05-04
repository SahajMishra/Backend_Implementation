import { Router } from "express";
import { getLastRun, health, optimize } from "../controllers/scheduleController.js";

const router = Router();

router.post("/optimize", optimize);
router.get("/health", health);
router.get("/last-run", getLastRun);

export default router;
