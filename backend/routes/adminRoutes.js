import express from "express";
import { getCandidates, getExperts, getInfo, setInterview, getBestExperts} from "../controllers/adminControllers.js";
const router = express.Router();

router.get("/", getInfo);
router.get("/candidates", getCandidates);
router.get("/experts", getExperts);
router.get('/match/:_id',getBestExperts);

export default router;