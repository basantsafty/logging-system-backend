import {createApplication} from "./application.controler.js";
import express from "express";

const appRouter = express.Router();
appRouter.post("/", createApplication);
export default appRouter;