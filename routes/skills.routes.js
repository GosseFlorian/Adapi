// routes/skills.routes.js
import { Router } from "express";
import {
  getAllSkills,
  getSkillById,
  createSkill,
} from "../controllers/skills.controller.js";

const router = Router();

router.get("/", getAllSkills);
router.get("/:id", getSkillById);
router.post("/", createSkill);

export default router;
