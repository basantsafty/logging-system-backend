import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["INFO", "WARN", "ERROR"], // enforce uppercase if required
      required: true,
    },
    count: {
      type: Number,
      default: 1,
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
  },
  { timestamps: true } // auto-manages createdAt & updatedAt
);

const Log = mongoose.model("Log", logSchema);
export default Log;
