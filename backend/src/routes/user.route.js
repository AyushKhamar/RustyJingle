import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getUserById } from "../controller/user.controller.js";

const router = new express.Router();

router.get("/", protectRoute, getAllUsers);
router.get("/:id", protectRoute, getUserById);

export { router as userRouter };

//todo get messages between two users
