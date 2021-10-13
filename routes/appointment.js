const express = require('express');
const { errorHandler } = require("../helpers/errorHandler");
const { authJwt } = require("../helpers/jwt");
const { createAppointment, getAppointment, updateAppointment,getCountAppointments } = require('../controllers/appointment');
const router = express.Router();

router.post('/',createAppointment)
router.get('/:id',getAppointment)
router.put('/:id',authJwt,errorHandler,updateAppointment)
router.get('/get/count',getCountAppointments)

module.exports = router
