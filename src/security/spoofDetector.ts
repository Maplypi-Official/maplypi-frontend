// src/security/spoofDetector.ts

export interface LocationMeta {
  accuracy?: number;
  altitude?: number;
  speed?: number;
  heading?: number;
}

export function detectSpoof(meta: LocationMeta): boolean {
  let risk = 0;

  if (meta.accuracy && meta.accuracy > 100) risk += 30;
  if (meta.speed && meta.speed > 70) risk += 40;
  if (meta.altitude && meta.altitude > 10000) risk += 20;

  return risk >= 50;
}
