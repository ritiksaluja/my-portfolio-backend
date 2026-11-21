import { Request, Response } from "express";
import { Project } from "../models/Project.js";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { title, desc, tags, image, projectUrl } = req.body;
  try {
    const project = new Project({ title, desc, tags, image, projectUrl });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, desc, tags, image, projectUrl } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { title, desc, tags, image, projectUrl },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};
