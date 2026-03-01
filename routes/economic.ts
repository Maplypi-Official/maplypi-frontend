import { Router } from "express"
import Hex from "../models/Hex"
import Activity from "../models/Activity"
import { calculateHexAuthenticity } from "../economy/hexScoring"
import { detectManipulation } from "../economy/manipulationDetector"

const router = Router()

router.post("/hex-update", async (req, res) => {
  const { hexId } = req.body

  const activities = await Activity.find({ hexId })

  const transactionVolume =
    activities.reduce((sum, a) => sum + a.transactionVolume, 0)

  const uniqueUsers =
    new Set(activities.map(a => a.userId)).size

  const previous = await Hex.findOne({ hexId })

  const suspiciousActivity =
    activities.filter(a => a.transactionVolume > 10000).length

  const authenticityScore = calculateHexAuthenticity({
    transactionVolume,
    uniqueUsers,
    suspiciousActivity
  })

  const manipulation = detectManipulation({
    previousVolume: previous?.transactionVolume || 0,
    currentVolume: transactionVolume,
    uniqueUsers
  })

  const updated = await Hex.findOneAndUpdate(
    { hexId },
    {
      transactionVolume,
      uniqueUsers,
      suspiciousActivity,
      authenticityScore
    },
    { upsert: true, new: true }
  )

  res.json({
    authenticityScore,
    manipulation
  })
})

export default router
