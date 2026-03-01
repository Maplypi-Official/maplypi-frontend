// server/models/Activity.ts

import mongoose from "mongoose"

const ActivitySchema = new mongoose.Schema({
  userId: String,
  hexId: String,
  transactionVolume: Number,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Activity", ActivitySchema)
