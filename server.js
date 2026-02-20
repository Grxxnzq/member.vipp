
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cron = require('node-cron')

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/member", require("./routes/member"))
app.use("/api/admin", require("./routes/admin"))
app.use("/api/payment", require("./routes/payment"))

app.get("/", (req,res)=>{
  res.send("member.vipp PRO running")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log("Server running on", PORT))
