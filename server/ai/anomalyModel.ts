// server/ai/anomalyModel.ts

interface ActivityVector {
  checkInFrequency: number
  avgSpeed: number
  transactionVolume: number
  deviceSwitches: number
}

export class AnomalyEngine {
  private history: ActivityVector[] = []

  addSample(sample: ActivityVector) {
    this.history.push(sample)
    if (this.history.length > 10000) {
      this.history.shift()
    }
  }

  private mean(values: number[]) {
    return values.reduce((a, b) => a + b, 0) / values.length
  }

  private std(values: number[]) {
    const m = this.mean(values)
    return Math.sqrt(
      this.mean(values.map(v => (v - m) ** 2))
    )
  }

  detect(sample: ActivityVector): number {
    if (this.history.length < 20) return 0

    const fields = Object.keys(sample) as (keyof ActivityVector)[]
    let anomalyScore = 0

    for (const field of fields) {
      const values = this.history.map(h => h[field])
      const m = this.mean(values)
      const s = this.std(values) || 1

      const z = Math.abs((sample[field] - m) / s)
      anomalyScore += z
    }

    return anomalyScore
  }
}

export const anomalyEngine = new AnomalyEngine()
