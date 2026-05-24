import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const server = express();
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



startServer();
