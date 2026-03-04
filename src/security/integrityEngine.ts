// src/security/integrityEngine.ts

interface IntegrityInput {
  movementValid: boolean;
  spoofDetected: boolean;
  rapidCheckIn: boolean;
  fingerprintMismatch: boolean;
}

export function calculateIntegrityScore(input: IntegrityInput): number {
  let score = 100;

  if (!input.movementValid) score -= 30;
  if (input.spoofDetected) score -= 40;
  if (input.rapidCheckIn) score -= 20;
  if (input.fingerprintMismatch) score -= 25;

  return Math.max(score, 0);
}

export function isUserBlocked(score: number): boolean {
  return score < 50;
}
