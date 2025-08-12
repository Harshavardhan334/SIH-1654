import express from "express";
import {
    getExpertInfo,
    registerExpert,
    updateExpert,
} from "../controllers/expertControllers.js";
import { isAuthenticated, authorizeRoles } from "../Middlewares/auth.js";

const router = express.Router();

router.get("/home", isAuthenticated, authorizeRoles('expert'), getExpertInfo);
router.post("/register", isAuthenticated, authorizeRoles('expert'), registerExpert);
router.put("/update", isAuthenticated, authorizeRoles('expert'), updateExpert);

export default router;
