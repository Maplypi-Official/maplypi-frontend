// server/security/integrityEngine.ts

interface IntegrityInput {
  speedValid: boolean;
  rapidCheckIn: boolean;
  fingerprintMatch: boolean;
}

export function calculateIntegrity(input: IntegrityInput) {
  let score = 100;

  if (!input.speedValid) score -= 40;
  if (input.rapidCheckIn) score -= 30;
  if (!input.fingerprintMatch) score -= 20;

  return Math.max(score, 0);
}

export function isBlocked(score: number) {
  return score < 50;
}
