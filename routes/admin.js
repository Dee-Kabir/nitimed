const express = require('express');
const { adminLogin, adminRegister,adminPendingAppointments, getDoctorByNameAndCity } = require('../controllers/admin');
const router = express.Router()

router.post("/login",adminLogin)
router.post("/register",adminRegister)
router.get("/pending",adminPendingAppointments)
router.get("/queryDoctor",getDoctorByNameAndCity)

module.exports = router;