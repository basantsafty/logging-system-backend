import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  developerRouter from "./developer/developer.router.js";
import {validateAuthToken} from "./middlewares/auth.middlewares.js";
dotenv.config();

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT_NUMBER || 3000;

async function startServer() {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("✅ Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" MongoDB connection error:", err);
  }
}
server.use("/api/users", developerRouter);


startServer();
