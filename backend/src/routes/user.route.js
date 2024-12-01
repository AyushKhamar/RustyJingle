import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getMessages,
  getUserById,
} from "../controller/user.controller.js";

const router = new express.Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);

export { router as userRouter };

//todo get messages between two users
