import { Request, Response } from "express";
import { User } from "../models/User.js";
import { AuthRequest } from "../middlewares/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Login controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "dev_portfolio_secret",
      { expiresIn: "24h" }
    );

    res.json({ token, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during login" });
  }
};

// Verify Token controller (GET /verify)
export const verifyToken = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Admin user not found" });
    }
    res.json({ valid: true, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during token verification" });
  }
};

// Change Password controller (POST /change-password)
export const changePassword = async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "Admin user not found" });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect current password" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during password update" });
  }
};
