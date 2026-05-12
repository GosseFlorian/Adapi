import { Router } from "express";
import {
  createResourceSkill,
  deleteResourceSkill,
  getAllResourcesSkills,
} from "../controllers/resources_skills.controller.js";

const router = Router();

router.get("/", getAllResourcesSkills);
router.post("/", createResourceSkill);
router.delete("/:resource_id/:skill_id", deleteResourceSkill);

export default router;
