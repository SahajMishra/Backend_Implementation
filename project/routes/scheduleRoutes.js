import { Router } from "express";
import { optimize } from "../controllers/scheduleController.js";

const router = Router();

router.post("/optimize", optimize);

export default router;
