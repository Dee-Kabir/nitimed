const express = require('express')
const router = express.Router()
const {createOrder,verifySignature, capturePayments} = require("../controllers/razorpay")

router.post('/order',createOrder);
router.post('/payment/verify',verifySignature)
router.post('/payment/capture',capturePayments)
module.exports = router