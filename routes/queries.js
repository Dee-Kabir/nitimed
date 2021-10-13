const express = require('express')
const { getFaq, getServices, getTillNow,postFaq, postServices, postTillNow } = require('../controllers/queries')
const router = express.Router()


router.get('/faq',getFaq)
router.get('/services',getServices)
router.get('/tillnow',getTillNow)

router.post('/faq',postFaq)
router.post('/services',postServices)
router.post('/tillnow',postTillNow)

module.exports = router