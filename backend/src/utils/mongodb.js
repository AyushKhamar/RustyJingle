import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
export const connectToMongoDb = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => {
      console.log("error in connecting database", error);
    });
};
