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
export const getLogs = async (req, res, next) => {
  try {
    const { name } = req.params;
    const app = await Application.findOne({ name, developer: req.developer._id });
    if (!app) {
      return res.status(404).json({ message: "Application not found for this developer" });
    } 
    const logs = await Log.find({ application: app._id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    next(error);
  }
};


export const getLogsForApplication = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { level, page = 1, limit = 10, sort = "-createdAt" } = req.query;

    // Find the app by name and developer (JWT auth ensures req.userId is set)
    const app = await Application.findOne({ name, developer: req.userId });
    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Build query
    const query = { application: app._id };
    if (level) query.level = level;

    // Fetch logs with pagination + sorting
    const logs = await Log.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Count total logs for pagination metadata
    const totalLogs = await Log.countDocuments(query);

    res.status(200).json({
      logs,
      pagination: {
        total: totalLogs,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalLogs / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

