import express from "express";
import { getCandidateInfo, registerCandidate, updateCandidate } from "../controllers/candidateControllers.js";

const router = express.Router();

router.get("/home",  getCandidateInfo);
router.post("/register", registerCandidate);
router.put("/update", updateCandidate);

export default router;