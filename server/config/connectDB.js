import mongoose from "mongoose";
import app from "../index.js";
import { PORT, MONGODB_URI, NODE_ENV } from "./env.js";

function connectDB() {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to database...");
      app.listen(PORT, () => {
        console.log(
          `Todo-app is running in ${NODE_ENV} mode at http://localhost:${PORT}`
        );
      });
    })
    .catch((ex) => {
      console.log("Failed to connect to database...", ex.message);
    });
}

export default connectDB;
