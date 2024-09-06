import { catchAsyncErrors } from "../Middlewares/catchAsyncError.js";
import { Expert } from "../models/expertSchema.js";
import { Candidate } from "../models/candidateSchema.js";
import { InterviewBoard } from "../models/interviewBoardSchema.js";
import ErrorHandler from "../Middlewares/error.js";

export const getCandidates = catchAsyncErrors(async (req, res, next) => {
    const candidates = await Candidate.find({});
    console.log(candidates);
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
export const getBestExperts = catchAsyncErrors((req, res, next) => {
    const candidateId = req.params._id;
    
    // Spawn a child process to run the Python script
    const process = spawn('python', ["./similarity_score.py", candidateId]);
    
    let result = '';

    process.stdout.on('data', (data) => {
        result += data.toString();
    });

    process.on('close', (code) => {
        // Clean up the result string to match JSON array format
        let cleanedResult = result
            .replace(/^\[|\]$/g, '')  // Remove the brackets
            .replace(/'/g, '"')       // Replace single quotes with double quotes
            .split(',')               // Split the string by comma
            .map(item => item.trim()); // Trim whitespace

        // Convert to JavaScript array
        let bestExperts = cleanedResult;

        res.status(200).json({
            success: true,
            bestExperts
        });
    });

    process.on('error', (err) => {
        return next(new ErrorHandler("Error executing Python script", 500));
    });
});


export const setInterview = catchAsyncErrors(async (req, res, next) => {
    const { boardName, interviewDate, subjectArea, candidate, experts, relevancyScore } = req.body;
    const createdBy = req.body.user._id;
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