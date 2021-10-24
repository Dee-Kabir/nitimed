const express = require('express')
const { getFaq, getServices, getTillNow,postFaq, postServices, postTillNow, postDisease ,postDiagonstic,
 postDispensary, getListOfCenters, getListOfCentersByName} = require('../controllers/queries')
const router = express.Router()


router.get('/faq',getFaq)
router.get('/services',getServices)
router.get('/tillnow',getTillNow)
router.get('/diagonstic',getListOfCenters)
router.get('/diagonsticQuery',getListOfCentersByName)

router.post('/faq',postFaq)
router.post('/services',postServices)
router.post('/tillnow',postTillNow)
router.post('/diseases',postDisease)
router.post('/dispensary',postDispensary)
router.post('/diagonstic',postDiagonstic)

module.exports = router