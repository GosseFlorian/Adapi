import { Router } from "express";
import { getAllResourcesSkills } from "../controllers/resources_skills.controller";

const router = Router();

router.get("/", getAllResourcesSkills);

export default router;
