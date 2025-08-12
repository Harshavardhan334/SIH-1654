import mongoose from "mongoose";

export const dbConnection = () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/PROFILE_MATCHER";

  mongoose
    .connect(mongoUri, {
      dbName: mongoUri.includes("/") ? undefined : "PROFILE_MATCHER",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Database connection error: ${err}`);
    });
};