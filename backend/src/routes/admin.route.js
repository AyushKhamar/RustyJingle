import express from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";

const router = new express.Router();
// todo this makes the code cleaner by making sure that the middlewares common to all routes are ran first and then we hit the actual routes.
router.use(protectRoute, requireAdmin);
router.get("/check", checkAdmin);
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export { router as adminRouter };
