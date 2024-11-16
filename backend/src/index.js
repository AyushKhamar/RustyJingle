import express from "express";
import dotenv from "dotenv";
import { connectToMongoDb } from "./utils/mongodb.js";
import { userRouter } from "./routes/user.route.js";
import { authRouter } from "./routes/auth.route.js";
import { adminRouter } from "./routes/admin.route.js";
import { albumRouter } from "./routes/album.route.js";
import { songRouter } from "./routes/song.route.js";
import { statRouter } from "./routes/stat.route.js";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();
const app = express();

app.use(clerkMiddleware()); //this will add auth to req object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songRouter);
app.use("/api/albums", albumRouter);
app.use("/api/stats", statRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server started at port ${process.env.PORT}`);
  await connectToMongoDb();
});
