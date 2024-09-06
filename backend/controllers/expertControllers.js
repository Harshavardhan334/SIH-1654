import { catchAsyncErrors } from "../Middlewares/catchAsyncError.js";
import { Expert } from "../models/expertSchema.js";
import { InterviewBoard } from "../models/interviewBoardSchema.js";
import ErrorHandler from "../Middlewares/error.js";

// export const getUser = catchAsyncErrors(async (req, res, next) => {
//   const user = req.user;
//   const expert = await Expert.findOne({ user: user._id });
//   res.status(200).json({
//     success: true,
//     user,
//     expert, 
//   });
// });

// export const getInterviews = catchAsyncErrors(async(req,res,next)=>{
//     const user = req.user;
//     const expert = await Expert.findOne({user:user._id});
//     const interviews = await InterviewBoard.find({ experts: expert._id });
//     res.status(200).json({
//         success: true,
//         interviews
//       });
// });

export const getExpertInfo = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const expert = await Expert.findOne({ user: user._id });
  const interviews = await InterviewBoard.find({ experts: expert._id });
  res.status(200).json({
    success: true,
    user,
    expert, 
    interviews
  });
});

export const registerExpert = catchAsyncErrors(async (req, res, next) => {
  const { name, email, _id: userId } = req.body.user;
  const {
    domain,
    researchInterests,
    experienceYears,
    projects,
  } = req.body;

  if (!domain || !researchInterests || !experienceYears || !projects) {
    return next(new ErrorHandler("Please fill in the entire form!"));
  }

  const isEmail = await Expert.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }

  const newExpert = await Expert.create({
    userId,
    name,
    domain,
    researchInterests,
    experienceYears,
    projects,
  });

  res.status(200).json({
    success: true,
    expert: newExpert,
  });
});

export const updateExpert = catchAsyncErrors(async (req, res, next) => {
  const { userId, name, domain, researchInterests, experienceYears, projects } = req.body;

  let expert = await Expert.findOne({ userId });
  if (!expert) {
      return next(new ErrorHandler("Expert not found!", 404));
  }

  expert.name = name || expert.name;
  expert.domain = domain || expert.domain;
  expert.researchInterests = researchInterests || expert.researchInterests;
  expert.experienceYears = experienceYears || expert.experienceYears;
  expert.projects = projects || expert.projects;

  await expert.save();

  res.status(200).json({
      success: true,
      expert,
  });
});
