import { Router } from "express";
import { getAllResourcesSkills } from "../controllers/resources_skills.controller.js";

const router = Router();

router.get("/", getAllResourcesSkills);

export default router;
