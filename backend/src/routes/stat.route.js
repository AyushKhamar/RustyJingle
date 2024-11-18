import express from "express";

import { getStats } from "../controller/stat.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = new express.Router();

router.get("/", protectRoute, requireAdmin, getStats);

export { router as statRouter };
