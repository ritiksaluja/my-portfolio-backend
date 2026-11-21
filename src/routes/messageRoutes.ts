import { Router } from "express";
import { createMessage, getMessages, deleteMessage } from "../controllers/messageController.js";
import { requireAdmin } from "../middlewares/auth.js";
import { validateMessage } from "../middlewares/validation.js";

const router = Router();

// Submit contact form (Public, validated)
router.post("/", validateMessage, createMessage);

// Inbox management (Protected)
router.get("/", requireAdmin, getMessages);
router.delete("/:id", requireAdmin, deleteMessage);

export default router;
