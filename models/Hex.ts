import mongoose from "mongoose"

const HexSchema = new mongoose.Schema({
  hexId: String,
  transactionVolume: Number,
  uniqueUsers: Number,
  suspiciousActivity: Number,
  authenticityScore: { type: Number, default: 100 }
})

export default mongoose.model("Hex", HexSchema)
