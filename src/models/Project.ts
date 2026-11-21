import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  projectUrl: {
    type: String,
    required: false,
    trim: true,
  },
}, {
  timestamps: true,
});

export const Project = model("Project", projectSchema);
