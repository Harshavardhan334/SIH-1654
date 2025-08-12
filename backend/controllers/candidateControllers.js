import { catchAsyncErrors } from "../Middlewares/catchAsyncError.js";
import { Candidate } from "../models/candidateSchema.js";
import { InterviewBoard } from "../models/interviewBoardSchema.js";
import { Expert } from "../models/expertSchema.js";
import ErrorHandler from "../Middlewares/error.js";

// export const getUser = catchAsyncErrors(async (req, res, next) => {
//   const user = req.user;
//   const candidate = await Candidate.findOne({ user: user._id });
//   res.status(200).json({
//     success: true,
//     user,
//     candidate,
//   });
// });

// export const getInterviews = catchAsyncErrors(async (req, res, next) => {
//   const user = req.user;
//   const candidate = await Candidate.findOne({ user: user._id });

//   if (!candidate) {
//     return next(new ErrorHandler("Candidate not found", 404));
//   }

//   const interviews = await InterviewBoard.find({ candidate: candidate._id });
//   res.status(200).json({
//     success: true,
//     interviews,
//   });
// });

export const getCandidateInfo = catchAsyncErrors(async (req, res, next) => {
  const candidate = await Candidate.findOne({ user: req.user._id });
  const interviews = await InterviewBoard.find({ candidate: candidate?._id })
    .populate({
      path: 'experts',
      select: 'name domain',
    });

  res.status(200).json({
    success: true,
    candidate,
    interviews,
  });
});

export const registerCandidate = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.user);
  const { name, _id } = req.user; 
  const {
    domain,
    researchInterests,
    experienceYears,
    projects,
  } = req.body;

  if (!domain || !researchInterests || !experienceYears || !projects) {
    return next(new ErrorHandler("Please fill in the entire form!"));
  }

  const existing = await Candidate.findOne({ user: _id });
  if (existing) {
    // Update existing profile instead of creating new one
    existing.name = name;
    existing.domain = domain;
    existing.researchInterests = researchInterests;
    existing.experienceYears = experienceYears;
    existing.projects = projects;
    await existing.save();
    
    return res.status(200).json({
      success: true,
      candidate: existing,
    });
  }

  const candidate = await Candidate.create({
    user:_id,
    name,
    domain,
    researchInterests,
    experienceYears,
    projects,
  });

  res.status(200).json({
    success: true,
    candidate,
  });
});

export const updateCandidate = catchAsyncErrors(async (req, res, next) => {
  const { name, domain, researchInterests, experienceYears, projects } = req.body;

  let candidate = await Candidate.findOne({ user: req.user._id });
  if (!candidate) {
      return next(new ErrorHandler("Candidate not found!", 404));
  }

  candidate.name = name || candidate.name;
  candidate.domain = domain || candidate.domain;
  candidate.researchInterests = researchInterests || candidate.researchInterests;
  candidate.experienceYears = experienceYears || candidate.experienceYears;
  candidate.projects = projects || candidate.projects;

  await candidate.save();

  res.status(200).json({
      success: true,
      candidate,
  });
});