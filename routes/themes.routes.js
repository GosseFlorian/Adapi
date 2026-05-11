import { Router } from "express";
import {
  getAllThemes,
  getThemeById,
  createTheme,
  updateTheme,
} from "../controllers/themes.controller.js";

const router = Router();

router.get("/", getAllThemes);
router.get("/:id", getThemeById);
router.post("/", createTheme);
router.patch("/", updateTheme);

export default router;
