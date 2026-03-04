// server/economy/hexScoring.ts

interface HexMetrics {
  transactionVolume: number
  uniqueUsers: number
  suspiciousActivity: number
}

export function calculateHexAuthenticity(metrics: HexMetrics) {
  let score = 100

  if (metrics.uniqueUsers < 5) score -= 20
  if (metrics.suspiciousActivity > 10) score -= 30

  const activityRatio =
    metrics.transactionVolume / (metrics.uniqueUsers || 1)

  if (activityRatio > 1000) score -= 25

  return Math.max(score, 0)
}
