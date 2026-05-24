import express from "express";
import { registerDeveloper } from "./developer.controler.js";

const router = express.Router();

router.post("/register", registerDeveloper);

export default router;
