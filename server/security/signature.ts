// server/security/signature.ts

import crypto from "crypto";

const SECRET = process.env.SERVER_SECRET!;

export function signPayload(payload: object) {
  const data = JSON.stringify(payload);
  return crypto
    .createHmac("sha256", SECRET)
    .update(data)
    .digest("hex");
}
