import { Router } from "express";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById,
  updateResource,
} from "../controllers/resources.controller.js";

const router = Router();

router.get("/", getAllResources);
router.get("/:id", getResourceById);
router.patch("/:id", updateResource);
router.delete("/:id", deleteResource);
router.post("/", createResource);

export default router;
