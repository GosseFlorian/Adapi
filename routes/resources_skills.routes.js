import { Router } from "express";
import {
  createResourceSkill,
  getAllResourcesSkills,
} from "../controllers/resources_skills.controller.js";

const router = Router();

router.get("/", getAllResourcesSkills);
router.post("/", createResourceSkill);

export default router;
