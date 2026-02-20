
const express = require("express")
const router = express.Router()

router.get("/stats", (req,res)=>{
  res.json({message:"Admin stats endpoint"})
})

module.exports = router
