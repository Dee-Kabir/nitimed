const express = require('express');
const { errorHandler } = require("../helpers/errorHandler");
const { authJwt } = require("../helpers/jwt");
const { createAppointment, getAppointment, updateAppointment,getCountAppointments,createVaccination, createSeminationBooking } = require('../controllers/appointment');
const router = express.Router();

router.post('/',authJwt,errorHandler,createAppointment)
router.get('/:id',getAppointment)
router.put('/:id',authJwt,errorHandler,updateAppointment)
router.get('/get/count',getCountAppointments)
router.post('/vaccination',authJwt,errorHandler,createVaccination);
router.post('/insemination',authJwt,errorHandler,createSeminationBooking);

module.exports = router
