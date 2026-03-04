import express from "express"
import mongoose from "mongoose"
import http from "http"
import economicRoutes from "./routes/economic"
import { initSocket } from "./realtime/socketEngine"

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI!)

app.use("/api", economicRoutes)

const server = http.createServer(app)

initSocket(server)

server.listen(5000, () => {
  console.log("🔥 Advanced AI Geo-Economic Engine Running")
})
