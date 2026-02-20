
const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
  res.json({message:"Member endpoint active"})
})

module.exports = router
