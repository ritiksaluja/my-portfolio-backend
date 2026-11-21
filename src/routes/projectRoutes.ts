import { Router } from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { requireAdmin } from "../middlewares/auth.js";
import { validateProject } from "../middlewares/validation.js";

const router = Router();

// Retrieve projects (Public)
router.get("/", getProjects);

// Project write actions (Protected & Validated)
router.post("/", requireAdmin, validateProject, createProject);
router.put("/:id", requireAdmin, validateProject, updateProject);
router.delete("/:id", requireAdmin, deleteProject);

export default router;
