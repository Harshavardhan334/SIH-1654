import express from "express";
import { getCandidateInfo, registerCandidate, updateCandidate } from "../controllers/candidateControllers.js";
import { isAuthenticated, authorizeRoles } from "../Middlewares/auth.js";

const router = express.Router();

router.get("/home",  isAuthenticated, authorizeRoles('candidate'), getCandidateInfo);
router.post("/register", isAuthenticated, authorizeRoles('candidate'), registerCandidate);
router.put("/update", isAuthenticated, authorizeRoles('candidate'), updateCandidate);

export default router;