const express = require('express');
const { addAnimalToUser, getAnimalInfo, removeAnimalFromUser, updateAnimal, getAllAnimalsInfo,BookVaccinationForAnimal,addVaccine, vaccinationForAnimal,BookSeminationForAnimal,getValidMailIds } = require('../controllers/animal');
const router = express.Router()
const { errorHandler } = require("../helpers/errorHandler");
const { authJwt } = require("../helpers/jwt");

router.get('/all/:id',getAllAnimalsInfo)
router.put('/suggestVaccine/:id',authJwt,errorHandler,BookVaccinationForAnimal)
router.post('/seminationCompleted/:id',authJwt,errorHandler,BookSeminationForAnimal)
router.put('/bookVaccine/:id',authJwt,errorHandler,vaccinationForAnimal)
router.get('/validMale',authJwt,errorHandler,getValidMailIds)
router.get('/:id',getAnimalInfo)
router.post('/addVaccine',addVaccine);
router.post('/:id',authJwt,errorHandler,addAnimalToUser)
router.put('/:id',authJwt,errorHandler,updateAnimal)
router.delete('/:id',authJwt,errorHandler,removeAnimalFromUser);


module.exports = router