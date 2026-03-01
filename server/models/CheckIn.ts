// server/models/CheckIn.ts

import mongoose from "mongoose";

const CheckInSchema = new mongoose.Schema({
  userId: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }
  },
  integrityScore: Number,
  createdAt: { type: Date, default: Date.now }
});

CheckInSchema.index({ location: "2dsphere" });

export default mongoose.model("CheckIn", CheckInSchema);
