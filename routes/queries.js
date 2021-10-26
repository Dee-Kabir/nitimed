const express = require('express')
const { getFaq, getServices, getTillNow,postFaq, postServices, postTillNow, getListOfCenters, getListOfCentersByName, postData, getVaccines} = require('../controllers/queries')
const router = express.Router()


router.get('/faq',getFaq)
router.get('/services',getServices)
router.get('/tillnow',getTillNow)
router.get('/diagonstic',getListOfCenters)
router.get('/diagonsticQuery',getListOfCentersByName)
router.get('/vaccine',getVaccines)

router.post('/faq',postFaq)
router.post('/services',postServices)
router.post('/tillnow',postTillNow)
router.post('/postData',postData)

module.exports = router