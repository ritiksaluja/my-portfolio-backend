import { Request, Response, NextFunction } from "express";

// Helper to validate email regex
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address" });
  }

  next();
};

export const validateChangePassword = (req: Request, res: Response, next: NextFunction) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current password and new password are required" });
  }

  if (typeof newPassword !== "string" || newPassword.length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters long" });
  }

  next();
};

export const validateProject = (req: Request, res: Response, next: NextFunction) => {
  const { title, desc, tags, image, projectUrl } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Project title is required" });
  }

  if (!desc || typeof desc !== "string" || desc.trim() === "") {
    return res.status(400).json({ error: "Project description is required" });
  }

  if (tags && !Array.isArray(tags)) {
    return res.status(400).json({ error: "Tags must be an array of strings" });
  }

  if (image && typeof image !== "string") {
    return res.status(400).json({ error: "Image key must be a string" });
  }

  if (projectUrl && typeof projectUrl !== "string") {
    return res.status(400).json({ error: "Project URL must be a string" });
  }

  next();
};

export const validateMessage = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, subject, message } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required" });
  }

  if (!subject || typeof subject !== "string" || subject.trim() === "") {
    return res.status(400).json({ error: "Subject is required" });
  }

  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({ error: "Message content is required" });
  }

  next();
};
