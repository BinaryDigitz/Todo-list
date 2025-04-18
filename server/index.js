import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { JWT_SECRET } from "./config/env.js";

const app = express();

if (!JWT_SECRET) {
  console.log("FATAL ERROR: NO JWT PRIVATE KEY");
  console.log("Please provide JWT PRIVATE Key in the env file");
  process.exit(1);
}
process.on("uncaughtException", (ex) => {
  console.log("UNCAUGHT EX DETECTED");
  console.log(ex.message);
  throw new Error(ex);
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    httpOnly: true,
  })
);

// routes
app.get("/", (req, res) =>
  res.json({ success: true, message: "Hello World!", statusCode: 200 })
);


// error middlewares


export default app
