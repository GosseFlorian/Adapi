import { Router } from "express";
import {
  getAllThemes,
  getThemeById,
  createTheme,
} from "../controllers/themes.controller.js";

const router = Router();

router.get("/", getAllThemes);
router.get("/:id", getThemeById);
router.post("/", createTheme);

export default router;
