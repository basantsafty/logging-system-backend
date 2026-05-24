import {createLog} from "./log.controler.js";
import express from "express";
const logRouter = express.Router();
import {validateAuthToken} from "../middlewares/auth.middlewares.js";
import { getLogsForApplication } from "./log.controler.js";
// GET logs for an application (JWT required)


// POST a log to an application (API key required)
logRouter.post("/applications/:name/logs", createLog);
logRouter.get("/applications/:name/logs",  getLogsForApplication);
export default logRouter;