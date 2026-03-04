// src/security/fingerprint.ts

import { sha256 } from "./crypto";

export async function generateDeviceFingerprint(): Promise<string> {
  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.hardwareConcurrency,
    navigator.platform
  ].join("|");

  return await sha256(raw);
}
