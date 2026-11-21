import { Request, Response } from "express";
import { Message } from "../models/Message.js";

// Submit a new contact form message (Public)
export const createMessage = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Failed to submit message" });
  }
};

// Retrieve all contact form messages (Protected Admin)
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Delete a message by ID (Protected Admin)
export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
};
