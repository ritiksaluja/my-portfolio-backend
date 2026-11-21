import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import { Project } from "./models/Project.js";

dotenv.config();

const initialProjects = [
  {
    title: "POS System",
    desc: "End-to-end point of sale with real-time inventory sync, multi-outlet management, and offline-first architecture.",
    tags: ["REACT", "NODE.JS", "MONGODB"],
    image: "projectPos",
    projectUrl: "#"
  },
  {
    title: "Restaurant ERP",
    desc: "Full-stack ERP covering table management, KDS, inventory, payroll, and analytics for multi-chain restaurants.",
    tags: ["MERN", "DOCKER", "AWS"],
    image: "projectErp",
    projectUrl: "#"
  },
  {
    title: "BNPL Platform",
    desc: "Buy Now Pay Later engine with credit scoring, EMI workflows, Mollie/Adyen payment integrations, and risk dashboards.",
    tags: ["NODE.JS", "POSTGRESQL", "REDIS"],
    image: "projectBnpl",
    projectUrl: "#"
  },
  {
    title: "Live Streaming",
    desc: "Low-latency streaming platform with RTMP ingestion, adaptive bitrate, real-time chat, and viewer analytics.",
    tags: ["WEBRTC", "SOCKET.IO", "AWS"],
    image: "projectStreaming",
    projectUrl: "#"
  },
  {
    title: "Live Scoring App",
    desc: "Real-time sports scoring with sub-second ball-by-ball updates, leaderboards, and push notifications.",
    tags: ["WEBSOCKET", "REDIS", "REACT"],
    image: "projectScoring",
    projectUrl: "#"
  },
  {
    title: "Healthcare Platform",
    desc: "On-demand medical services with doctor booking, ambulance tracking, distance-based routing, and EHR.",
    tags: ["MERN", "MAPS API", "AWS"],
    image: "projectHealthcare",
    projectUrl: "#"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio_db");
    console.log("MongoDB Connected for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    console.log("Cleared existing users and projects.");

    // Create Admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("dev@1234", salt);

    const admin = new User({
      email: "admin@mailinator.com",
      password: hashedPassword
    });
    await admin.save();
    console.log("Created admin user admin@mailinator.com / dev@1234");

    // Create Projects
    await Project.insertMany(initialProjects);
    console.log("Seeded initial projects successfully.");

    mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
