import { catchAsyncErrors } from "../Middlewares/catchAsyncError.js";
import { Expert } from "../models/expertSchema.js";
import { Candidate } from "../models/candidateSchema.js";
import { InterviewBoard } from "../models/interviewBoardSchema.js";
import ErrorHandler from "../Middlewares/error.js";
import { spawn } from "child_process";

export const getCandidates = catchAsyncErrors(async (req, res, next) => {
    const candidates = await Candidate.find({});
    // console.log(candidates);
    res.status(200).json({
        success: true,
        candidates,
    });
});

export const getExperts = catchAsyncErrors(async (req, res, next) => {
    const experts = await Expert.find({});
    res.status(200).json({
        success: true,
        experts,
    });
});

export const getInfo = catchAsyncErrors(async (req, res, next) => {
    const experts = await Expert.find({});
    const candidates = await Candidate.find({});
    res.status(200).json({
        success: true,
        experts,
        candidates
    });
});

// Add the matching algo 
// Temporary JS-based matching as a placeholder
export const getBestExperts = catchAsyncErrors(async (req, res, next) => {
  const candidateId = req.params._id;
  const candidate = await Candidate.findById(candidateId);
  if (!candidate) {
    return next(new ErrorHandler("Candidate not found", 404));
  }

  const experts = await Expert.find({});
  // Simple Jaccard similarity on domain arrays
  const candDomains = new Set(candidate.domain || []);
  const scored = experts.map((e) => {
    const ed = new Set(e.domain || []);
    const inter = [...ed].filter((d) => candDomains.has(d)).length;
    const union = new Set([...(e.domain || []), ...(candidate.domain || [])]).size;
    const score = union === 0 ? 0 : inter / union;
    return { expert: e, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 6).map((s) => ({
    _id: s.expert._id,
    name: s.expert.name,
    domain: s.expert.domain,
    score: s.score,
  }));

  return res.status(200).json({ success: true, bestExperts: top });
});


export const setInterview = catchAsyncErrors(async (req, res, next) => {
    const { boardName, interviewDate, subjectArea, candidate, experts, relevancyScore } = req.body;
    const createdBy = req.user._id;
    if (!boardName || !interviewDate || !subjectArea || !candidate || !experts || !relevancyScore) {
        return next(new ErrorHandler("Please fill full form!"));
    }
    const isBoard = await InterviewBoard.findOne({ boardName });
    if (isBoard) {
        return next(new ErrorHandler("Panel/Interview already registered!"));
    }
    const interviewBoard = await InterviewBoard.create({
        boardName,
        interviewDate,
        subjectArea,
        candidate,
        experts,
        relevancyScore,
        createdBy
    });
    res.status(200).json({
        success: true,
        interviewBoard
    });
});

export const getInterviews = catchAsyncErrors(async (req, res, next) => {
  const interviews = await InterviewBoard.find({})
    .populate({ path: 'candidate', select: 'name domain' })
    .populate({ path: 'experts', select: 'name domain' })
    .populate({ path: 'createdBy', select: 'name role' });
  res.status(200).json({ success: true, interviews });
});