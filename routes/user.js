const express = require('express')
const { createUser, getUserList, getUser, loginUser, registerUser, getCount, deleteUser, updateUser, getAppointments, userExists,getUserPhone,getRoomId ,checkUserType} = require('../controllers/user')
const { errorHandler } = require('../helpers/errorHandler')
const { authJwt } = require('../helpers/jwt')
const router = express.Router()

router.post('/',createUser)
router.get('/check',authJwt,errorHandler,checkUserType)
router.get('/auth/:id',getUserPhone)
router.post('/register',registerUser)
router.get('/user/exist/:id',userExists)
router.get('/',authJwt,errorHandler,getUserList)
router.get('/roomId/:id',getRoomId)
router.get('/get/count',getCount)
router.get('/:id',authJwt,errorHandler,getUser)
router.delete('/:id',authJwt,errorHandler,deleteUser)
router.post('/login',loginUser)
router.put('/:id',authJwt,errorHandler,updateUser);
router.get('/get/appointments/:id',authJwt,errorHandler,getAppointments)

module.exports = router