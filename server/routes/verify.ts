// server/routes/verify.ts

import { Router } from "express";
import User from "../models/User";
import CheckIn from "../models/CheckIn";
import { validateSpeed } from "../security/geoUtils";
import { detectRapidCheckIn } from "../security/anomalyEngine";
import { calculateIntegrity, isBlocked } from "../security/integrityEngine";
import { signPayload } from "../security/signature";

const router = Router();

router.post("/verify-checkin", async (req, res) => {
  const { userId, lat, lng, timestamp, fingerprint } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const lastCheckIn = await CheckIn.findOne({ userId })
    .sort({ createdAt: -1 });

  let speedValid = true;

  if (lastCheckIn) {
    speedValid = validateSpeed(
      {
        lat: lastCheckIn.location.coordinates[1],
        lng: lastCheckIn.location.coordinates[0],
        timestamp: lastCheckIn.createdAt.getTime()
      },
      { lat, lng, timestamp }
    );
  }

  const rapid = await detectRapidCheckIn(userId);
  const fingerprintMatch = user.fingerprint === fingerprint;

  const integrityScore = calculateIntegrity({
    speedValid,
    rapidCheckIn: rapid,
    fingerprintMatch
  });

  if (isBlocked(integrityScore)) {
    return res.status(403).json({ error: "Integrity violation" });
  }

  await CheckIn.create({
    userId,
    location: {
      type: "Point",
      coordinates: [lng, lat]
    },
    integrityScore
  });

  const token = signPayload({ userId, lat, lng, timestamp });

  res.json({
    success: true,
    integrityScore,
    verificationToken: token
  });
});

export default router;
