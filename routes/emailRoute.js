const express = require('express')
const router = express.Router()
const {sendEmail,sendOtp,verifyOtp} = require('../controllers/email')

router.post('/sendEmail',sendEmail)
router.post('/sendOtp',sendOtp)
router.post('/verifyOtp',verifyOtp)

module.exports = router