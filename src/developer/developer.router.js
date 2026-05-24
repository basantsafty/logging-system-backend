import express from "express";
import { registerDeveloper } from "./developer.controler.js";
import { loginDeveloper } from "./developer.controler.js";

const router = express.Router();

router.post("/register", registerDeveloper);
router.post("/login", loginDeveloper);

export default router;
