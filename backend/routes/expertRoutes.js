import express from "express";
import {
    getExpertInfo,
    registerExpert,
    updateExpert,
} from "../controllers/expertControllers.js";

const router = express.Router();

router.get("/home", getExpertInfo);
router.post("/register", registerExpert);
router.put("/update", updateExpert);

export default router;
