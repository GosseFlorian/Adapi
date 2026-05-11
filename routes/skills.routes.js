// routes/skills.routes.js
import { Router } from "express";
import {
  getAllSkills,
  getSkillById,
} from "../controllers/skills.controller.js";

const router = Router();

router.get("/", getAllSkills);
router.get("/:id", getSkillById);

export default router;
