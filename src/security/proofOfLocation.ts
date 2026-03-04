// src/security/proofOfLocation.ts

import { generateDeviceFingerprint } from "./fingerprint";
import { validateMovement, GeoPoint } from "./movementValidator";
import { detectSpoof } from "./spoofDetector";
import { calculateIntegrityScore, isUserBlocked } from "./integrityEngine";
import { sha256 } from "./crypto";

let lastPoint: GeoPoint | null = null;
let lastCheckInTime = 0;
let storedFingerprint: string | null = null;

export async function performSecureCheckIn(
  lat: number,
  lng: number,
  meta: any
) {
  const now = Date.now();

  const currentPoint: GeoPoint = {
    lat,
    lng,
    timestamp: now
  };

  const fingerprint = await generateDeviceFingerprint();

  if (!storedFingerprint) {
    storedFingerprint = fingerprint;
  }

  const fingerprintMismatch = storedFingerprint !== fingerprint;

  let movementValid = true;
  if (lastPoint) {
    movementValid = validateMovement(lastPoint, currentPoint);
  }

  const spoofDetected = detectSpoof(meta);

  const rapidCheckIn = now - lastCheckInTime < 15000;

  const integrityScore = calculateIntegrityScore({
    movementValid,
    spoofDetected,
    rapidCheckIn,
    fingerprintMismatch
  });

  if (isUserBlocked(integrityScore)) {
    return {
      success: false,
      reason: "Integrity violation",
      integrityScore
    };
  }

  const proofPayload = JSON.stringify({
    lat,
    lng,
    timestamp: now,
    fingerprint
  });

  const proofHash = await sha256(proofPayload);

  lastPoint = currentPoint;
  lastCheckInTime = now;

  return {
    success: true,
    integrityScore,
    proofHash,
    payload: proofPayload
  };
}
