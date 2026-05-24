import Application from "../application/application.model.js";
import Log from "./log.model.js";

export const createLog = async (req, res, next) => {
  try {
    const { message, level } = req.body;
    const { name } = req.params;

    if (!message || !level) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find the app by name and developer
    const app = await Application.findOne({ name, developer: req.developer._id });
    if (!app) {
      return res.status(404).json({ message: "Application not found for this developer" });
    }

    const currentLogsCount = await Log.countDocuments({ application: app._id });

    const log = await Log.create({
      message,
      level,
      application: app._id,
      count: currentLogsCount + 1
    });

    res.status(201).json({ message: "Log created successfully", log });
  } catch (error) {
    next(error);
  }
};
