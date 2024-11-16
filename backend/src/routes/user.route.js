import express from "express";

const router = new express.Router();

router.get("/");

export { router as userRouter };
