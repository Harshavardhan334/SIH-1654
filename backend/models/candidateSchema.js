import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the user ID!"],
  },
  name: {
    type: String,
    required: [true, "Please enter the candidate's name!"],
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [30, "Name cannot exceed 30 characters!"],
  },
  domain: {
    type: [String],
    required: [true, "Please enter the candidate's domain(s)!"],
  },
  researchInterests: {
    type: [String],
    required: [true, "Please enter the candidate's research interest(s)!"],
  },
  experienceYears: {
    type: Number,
    required: [true, "Please enter the years of experience!"],
  },
  projects: {
    type: [String],
    required: [true, "Please enter the candidate's project(s)!"],
  },
  interviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewBoard",
      default:[]
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Candidate = mongoose.model("Candidate", candidateSchema);
