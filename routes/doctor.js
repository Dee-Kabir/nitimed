const express = require("express");
const multer = require('multer')
const {
  createDoctor,
  registerDoctor,
  getDoctorList,
  getCount,
  getDoctor,
  loginDoctor,
  getDoctorByQuery,
  doctorExists,
  getDoctorPhone,
  setRoomIdDoctor,
  changeAvailablity,
  updateDoctor,
  getPendingAppointments,
  getCompletedAppointments,
  registerDoctors
} = require("../controllers/doctor");
const { errorHandler } = require("../helpers/errorHandler");
const { authJwt } = require("../helpers/jwt");
const router = express.Router();

const FILE_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpeg',
  'image/jpg' : 'jpg'
}
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    if(file.fieldname === 'photo'){
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('Invalid image type')
      if(isValid){
          uploadError = null
      }
      cb(uploadError,'public/upload/photo')
    }else if(file.fieldname === 'proof'){
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('Invalid image type')
      if(isValid){
          uploadError = null
      }
      cb(uploadError,'public/upload/proof')
    }
      
  },
  filename: function (req,file,cb) {
      const fileName = file.originalname.replace(' ','-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null,`${fileName}-${Date.now()}.${extension}`)
  }
})
const uploadOptions = multer({storage : storage})

router.post("/",uploadOptions.fields([{name: 'photo',maxCount: 1},{name: 'proof',maxCount: 1}]), createDoctor);
router.post("/register",uploadOptions.fields([{name: 'photo',maxCount: 1},{name: 'proof',maxCount: 1}]), registerDoctor);
router.get("/auth/:id",getDoctorPhone)
router.put("/set/roomId/:id",authJwt,errorHandler,setRoomIdDoctor)
router.put('/:id',authJwt,errorHandler,updateDoctor)
router.get("/doctor/exist/:id",doctorExists)
router.get("/",authJwt,errorHandler, getDoctorList);
router.get("/get/count",authJwt,errorHandler, getCount);
router.get("/query",getDoctorByQuery)
router.get("/:id",authJwt,errorHandler, getDoctor);
router.post("/login", loginDoctor);
router.post("/registerDoctors",registerDoctors)
router.put("/set/available/:id",authJwt,errorHandler,changeAvailablity)
router.get('/pending-appointments/:id',authJwt,errorHandler,getPendingAppointments)
router.get('/completed-appointments/:id',authJwt,errorHandler,getCompletedAppointments);

module.exports = router;
 