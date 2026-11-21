import { Router } from "express";
import { login, verifyToken, changePassword } from "../controllers/authController.js";
import { requireAdmin } from "../middlewares/auth.js";
import { validateLogin, validateChangePassword } from "../middlewares/validation.js";

const router = Router();

// Public route for authentication
router.post("/login", validateLogin, login);

// Protected routes for validation and management
router.get("/verify", requireAdmin, verifyToken);
router.post("/change-password", requireAdmin, validateChangePassword, changePassword);

export default router;
