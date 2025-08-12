import express from "express";
import { getCandidates, getExperts, getInfo, setInterview, getBestExperts, getInterviews} from "../controllers/adminControllers.js";
import { isAuthenticated, authorizeRoles } from "../Middlewares/auth.js";
const router = express.Router();

// All admin routes are already mounted behind auth+role in app.js, but adding defense-in-depth here
router.get("/", isAuthenticated, authorizeRoles('admin'), getInfo);
router.get("/candidates", isAuthenticated, authorizeRoles('admin'), getCandidates);
router.get("/experts", isAuthenticated, authorizeRoles('admin'), getExperts);
router.get('/match/:_id', isAuthenticated, authorizeRoles('admin'), getBestExperts);
router.post('/setinterview', isAuthenticated, authorizeRoles('admin'), setInterview);
router.get('/interviews', isAuthenticated, authorizeRoles('admin'), getInterviews);

export default router;