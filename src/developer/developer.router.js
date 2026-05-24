import express from "express";
import { registerDeveloper } from "./developer.controler.js";
import { loginDeveloper } from "./developer.controler.js";

import { logoutUser } from "./developer.controler.js";

const developerRouter = express.Router();

developerRouter.post("/register", registerDeveloper);
developerRouter.post("/login", loginDeveloper);
developerRouter.post("/logout",  logoutUser);



export default developerRouter;
