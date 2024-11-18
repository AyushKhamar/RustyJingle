import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";

const router = new express.Router();

router.get("/", getAllAlbums);
router.get("/:id", getAlbumById);

export { router as albumRouter };
