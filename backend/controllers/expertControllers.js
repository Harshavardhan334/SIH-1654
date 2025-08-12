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
  const { _id: userId, name } = req.user;
  const { domain, experienceYears, publications, patents } = req.body;

  if (!domain || experienceYears == null || publications == null || patents == null) {
    return next(new ErrorHandler("Please fill in the entire form!"));
  }

  const existing = await Expert.findOne({ user: userId });
  if (existing) {
    // Update existing profile instead of creating new one
    existing.name = name;
    existing.domain = domain;
    existing.experienceYears = experienceYears;
    existing.publications = publications;
    existing.patents = patents;
    await existing.save();
    
    return res.status(200).json({
      success: true,
      expert: existing,
    });
  }

  const newExpert = await Expert.create({
    user: userId,
    name,
    domain,
    experienceYears,
    publications,
    patents,
  });

  res.status(200).json({
    success: true,
    expert: newExpert,
  });
});

export const updateExpert = catchAsyncErrors(async (req, res, next) => {
  const { name, domain, experienceYears, publications, patents } = req.body;

  let expert = await Expert.findOne({ user: req.user._id });
  if (!expert) {
      return next(new ErrorHandler("Expert not found!", 404));
  }

  expert.name = name || expert.name;
  expert.domain = domain || expert.domain;
  expert.experienceYears = experienceYears || expert.experienceYears;
  expert.publications = publications ?? expert.publications;
  expert.patents = patents ?? expert.patents;

  await expert.save();

  res.status(200).json({
      success: true,
      expert,
  });
});
