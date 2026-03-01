// server/economy/manipulationDetector.ts

interface EconomicSignal {
  previousVolume: number
  currentVolume: number
  uniqueUsers: number
}

export function detectManipulation(signal: EconomicSignal) {
  const growthRate =
    (signal.currentVolume - signal.previousVolume) /
    (signal.previousVolume || 1)

  if (growthRate > 5 && signal.uniqueUsers < 3) {
    return {
      manipulated: true,
      reason: "Artificial volume spike"
    }
  }

  return { manipulated: false }
}
