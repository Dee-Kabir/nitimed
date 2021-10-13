const express = require('express')
const { registerHospital, loginHospital,getHospital, addDoctorToHospital,getDoctorsOfHospital,updateHospital,findHospitals } = require('../controllers/hospital')
const { errorHandler } = require('../helpers/errorHandler')
const { authJwt } = require('../helpers/jwt')
const router = express.Router()

router.post('/register',registerHospital);
router.post('/login',loginHospital);
router.get('/',findHospitals)
router.get('/:id',authJwt,errorHandler,getHospital);
router.put('/add-doctor/:id',authJwt,errorHandler,addDoctorToHospital);
router.get('/doctors/:id',getDoctorsOfHospital);
router.put('/:id',authJwt,errorHandler,updateHospital)

module.exports = router;