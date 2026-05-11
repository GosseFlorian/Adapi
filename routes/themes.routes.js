import { Router } from "express";
import { getAllThemes } from "../controllers/themes.controller.js";

const router = Router();

router.get("/", getAllThemes);

export default router;
