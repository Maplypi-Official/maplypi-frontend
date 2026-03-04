// server/server.ts

import express from "express";
import mongoose from "mongoose";
import verifyRoute from "./routes/verify";

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!);

app.use("/api", verifyRoute);

app.listen(5000, () => {
  console.log("Secure Verification Server running on port 5000");
});
