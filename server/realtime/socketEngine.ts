// server/realtime/socketEngine.ts

import { Server } from "socket.io"
import { anomalyEngine } from "../ai/anomalyModel"

export function initSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: "*" }
  })

  io.on("connection", socket => {

    socket.on("activity_stream", data => {
      const score = anomalyEngine.detect(data)

      if (score > 15) {
        socket.emit("risk_alert", {
          level: "HIGH",
          anomalyScore: score
        })
      }
    })

  })

  return io
}
