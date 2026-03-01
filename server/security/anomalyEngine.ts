// server/security/anomalyEngine.ts

import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export async function detectRapidCheckIn(userId: string) {
  const key = `checkin:${userId}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 30);
  }

  return count > 3;
}
