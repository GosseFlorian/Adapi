import { Router } from "express";
import {
  getAllResources,
  getResourceById,
} from "../controllers/resources.controller.js";

const router = Router();

router.get("/", getAllResources);
router.get("/:id", getResourceById);

export default router;
