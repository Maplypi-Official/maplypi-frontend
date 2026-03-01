// server/models/User.ts

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  wallet: String,
  fingerprint: String,
  integrityScore: { type: Number, default: 100 }
});

export default mongoose.model("User", UserSchema);
