
const express = require("express")
const crypto = require("crypto")
const router = express.Router()
const supabase = require("../supabase")
const { activate } = require("../services/membershipService")

router.post("/webhook", async (req,res)=>{

  const signature = req.headers["x-omise-signature"]
  const payload = JSON.stringify(req.body)

  const expected = crypto
    .createHmac("sha256", process.env.OMISE_WEBHOOK_SECRET)
    .update(payload)
    .digest("hex")

  if(signature !== expected)
    return res.status(403).send("Invalid signature")

  const { reference } = req.body

  const { data:payment } = await supabase
    .from("payments")
    .select("*")
    .eq("transaction_ref", reference)
    .single()

  if(payment && payment.status === "pending"){
     await supabase
       .from("payments")
       .update({status:"success"})
       .eq("id", payment.id)

     await activate(payment.user_id, payment.package_type)
  }

  res.sendStatus(200)
})

module.exports = router
