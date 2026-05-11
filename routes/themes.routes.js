import { Router } from "express";
import {
  getAllThemes,
  getThemeById,
} from "../controllers/themes.controller.js";

const router = Router();

router.get("/", getAllThemes);
router.get("/:id", getThemeById);

export default router;
