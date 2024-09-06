import express from "express";
import { dbConnection } from "./Database/dbConnection.js";

import adminRouter from "./routes/adminRoutes.js";
import candidateRouter from "./routes/candidateRoutes.js";
import expertRouter from "./routes/expertRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./Middlewares/error.js";
import cookieParser from "cookie-parser";
import { isAuthenticated, authorizeRoles } from './Middlewares/auth.js'

const app = express();
config({ path: "./config/config.env" });
const PORT = process.env.PORT || 4000;


app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

app.use("/", userRouter);
app.use("/expert", isAuthenticated, authorizeRoles('expert'), expertRouter);
app.use("/admin", isAuthenticated, authorizeRoles('admin'), adminRouter);
app.use("/candidate", isAuthenticated, authorizeRoles('candidate'), candidateRouter);
dbConnection();

app.use(errorMiddleware);


export default app;