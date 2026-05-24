import {createApplication} from "./application.controler.js";
import {getApplications} from "./application.controler.js";
import {getApplication} from "./application.controler.js";
import {deleteApplication} from "./application.controler.js";
import express from "express";

const appRouter = express.Router();
appRouter.post("/", createApplication);
appRouter.get("/", getApplications);
appRouter.get("/:name", getApplication);
appRouter.delete("/:name", deleteApplication);
export default appRouter;