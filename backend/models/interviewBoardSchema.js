import mongoose from "mongoose";

const interviewBoardSchema = new mongoose.Schema({
  boardName: {
    type: String,
    required: [true, "Please enter the board name!"],
  },
  interviewDate: {
    type: Date,
    required: [true, "Please enter the interview date!"],
  },
  subjectArea: {
    type: String,
    required: [true, "Please enter the subject area!"],
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: [true, "Please provide the candidate ID!"],
  },
  experts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expert",
      required: [true, "Please provide the expert IDs!"],
    },
  ],
  relevancyScore: [
    {
      type: Number,
      min: [0, "Relevancy score cannot be less than 0!"],
      max: [1, "Relevancy score cannot exceed 1!"],
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the creator/admin ID!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const InterviewBoard = mongoose.model("InterviewBoard", interviewBoardSchema);
