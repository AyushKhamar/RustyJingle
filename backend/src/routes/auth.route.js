import express from "express";
import { authCallback } from "../controller/auth.controller.js";

const router = new express.Router();

router.post("/callback", authCallback);

export { router as authRouter };
