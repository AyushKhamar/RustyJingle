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
import fileUpload from "express-fileupload";
import path from "node:path";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";
import cron from "node-cron";
import fs from "fs";

dotenv.config();
const app = express();
const __dirname = path.resolve();
//todo pass in the express app to create the server here.
const httpServer = createServer(app);
initializeSocket(httpServer);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(clerkMiddleware()); //this will add auth to req object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);

const tempDir = path.join(process.cwd(), "temp");
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {});
      }
    });
  }
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songRouter);
app.use("/api/albums", albumRouter);
app.use("/api/stats", statRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// todo this is how you can setup one error controller, so that it consoles or displays error message for each of the catch blocks. we can just send it to this middleware via next(error)
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});
httpServer.listen(process.env.PORT, async () => {
  console.log(`Server started at port ${process.env.PORT}`);
  await connectToMongoDb();
});
