const express = require('express')
const { getFaq, getTillNow,postFaq, postTillNow, getListOfCenters, getListOfCentersByName, postData, getVaccines, getNodalHeads} = require('../controllers/queries')
const router = express.Router()


router.get('/faq',getFaq)
router.get('/nodalHeads',getNodalHeads)
router.get('/tillnow',getTillNow)
router.get('/diagonstic',getListOfCenters)
router.get('/diagonsticQuery',getListOfCentersByName)
router.get('/vaccine',getVaccines)

router.post('/faq',postFaq)

router.post('/tillnow',postTillNow)
router.post('/postData',postData)

module.exports = router