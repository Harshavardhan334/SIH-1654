import mongoose from "mongoose";

const expertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the user ID!"],
  },
  name: {
    type: String,
    required: [true, "Please enter the expert's name!"],
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [30, "Name cannot exceed 30 characters!"],
  },
  domain: {
    type: [String],
    required: [true, "Please enter the expert's domain(s)!"],
  },
  experienceYears: {
    type: Number,
    required: [true, "Please enter the years of experience!"],
  },
  publications: {
    type: Number,
    required: [true, "Please enter the number of publications!"],
  },
  patents: {
    type: Number,
    required: [true, "Please enter the number of patents!"],
  },
  interviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewBoard",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Expert = mongoose.model("Expert", expertSchema);