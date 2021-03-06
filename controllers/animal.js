const Animal = require('../modals/animal')
const User = require('../modals/user')
const RefModel = require('../modals/refModel')
const mongoose = require('mongoose')
const Vaccine = require('../modals/vaccine')
const Totalcount = require('../modals/totalcount')
const totalcount = require('../modals/totalcount')
exports.addAnimals = async(req,res) => {
    Animal.insertMany(req.body.animals
        )
}
exports.getAnimalInfo = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id)){
        const animal = await Animal.findById(req.params.id).populate({path : 'vaccines',populate: {
            path: 'onThis'
        }}).populate({path : 'semination',populate: {
            path: 'onThis' ,select: "name age"
        }}).select('name id age breed registrationId gender owner vaccines semination remarks')
        if(animal){
            return res.status(200).json({
                success: true,
                animal
            })
        }else{
            return res.status(400).json({
                success: false,
                message: 'Animal data not exists'
            })
        }
    }else{
        return res.status(400).json({
            success: false,
            message: 'Animal data not exists'
        })
    }
}
exports.getAllAnimalsInfo = async(req,res) => {
    var query = {owner : req.params.id};
    if(req.query.category==="artificialInsemination"){
        query = {...query,gender: 'F'}
    }
    if(mongoose.isValidObjectId(req.params.id)){
        const animals = await Animal.find(query).select('name id age breed registrationId gender')
        if(animals){
            return res.status(200).json({
                success: true,
                animals
            })
        }else{
            return res.status(400).json({
                success: false,
                message: 'Animals data not exists'
            })
        }
    }else{
        return res.status(400).json({
            success: false,
            message: 'Animals data not exists'
        })
    }
}
exports.addAnimalToUser = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id)){
        const {name,registrationId,age,gender,breed} = req.body
        const check = await Animal.findOne({registrationId})
        if(!check){
            var uniqueNumber = await Totalcount.findOneAndUpdate({type: "animalsRegistered"},{$inc : {count : 1}},{new: true})
            uniqueNumber = uniqueNumber.count;
            let animal = new Animal({
                name,registrationId,age,gender,breed,owner : req.params.id,uniqueNumber
            })
            animal = await animal.save();
            if(animal){
                return res.status(200).json({
                    success: true,
                    message: "Added Successfully."
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message: "Try Again after some time."
                })
            }
        }else{
            return res.status(400).json({
                success: false,
                message: "Animal with this registration number already registered"
            })
        }
        
    }else{
        return res.status(400).json({
            success: false,
            message: "Not Authorised."
        })
    }
}
exports.updateAnimal = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id)){
        const {phone} = req.body;
        const user = await User.findOne({phone})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "No user exists with this phone number"
            })
        }else{
            Animal.findByIdAndUpdate(req.params.id,{
                owner: user.id
            },{
                new: true
            }).then((animal,err) => {
                if(err){
                    console.log(err)
                    return res.status(400).json({
                        success: false,
                        message: 'User data not exists'
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: 'Animal data updated successfully.'
                })
            })
        }
    }else{
        return res.status(400).json({
            success: false,
            message: 'Animal data not exists'
        })
    }
}
exports.removeAnimalFromUser = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id)){   
        Animal.findByIdAndUpdate(req.params.id,{
            owner: null
        },{
            new: true
        }).then((animal,err) => {
            if(err){
                console.log(err)
                return res.status(400).json({
                    success: false,
                    message: 'Animal data not exists'
                })
            }
            return res.status(200).json({
                success: true,
                message: 'Animal data updated successfully.'
            })
        })
        
    }else{
        return res.status(400).json({
            success: false,
            message: 'Animal data not exists'
        })
    }
}
exports.BookVaccinationForAnimal = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id) && mongoose.isValidObjectId(req.body.vaccineId) && req.user.isAdmin!==0){
        let refm = new RefModel({
            onThis : req.body.vaccineId,
            onModel : 'Vaccine',
            completed: false,
            byWhom: req.body.doctorId
        })
        refm = await refm.save();
        if(refm){
            const animal = await Animal.findByIdAndUpdate(req.params.id,{
                $push : {vaccines : refm.id}
            },{
                new: true
            })
            if(animal){
                return res.status(200).json({
                    success: true,
                    message: "vaccine booked successfully"
                })
            }else{
                return res.status(400).json({
                    success:false,
                    error: "Try again after some time."
                })
            }
        }else{
            return res.status(400).json({
                success:false,
                error: "Try again after some time."
            })
        }
    }else{
        return res.status(400).json({
            success:false,
            error: "Try again after some time."
        })
    }
}
exports.BookSeminationForAnimal = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id) && mongoose.isValidObjectId(req.body.bullId)){
        try{
            Animal.findById(req.body.bullId).then(async(data) => {
                if(data && data.gender === 'M'){
                    let refm = new RefModel({
                        onThis : req.body.bullId,
                        onModel : 'Animal',
                        completed: true,
                        byWhom: req.body.doctorId
                    })
                    refm = await refm.save();
                    if(refm){
                        const animal = await Animal.findByIdAndUpdate(req.params.id,{
                            $push : {semination : refm._id}
                        },{
                            new: true
                        })
                        if(animal){
                            await totalcount.updateOne({type: "inseminationCompleted"},{$inc : {count : 1}})
                            return res.status(200).json({
                                success: true,
                                message: "semination done successfully"
                            })
                        }else{
                            return res.status(400).json({
                                success:false,
                                message: "Try again after some time."
                            })
                        }
                    }else{
                        return res.status(400).json({
                            success:false,
                            message: "Try again after some time."
                        })
                    }
                }else{
                    console.log(data)
                    return res.status(400).json({
                        success:false,
                        message: "Animal should be male and registered."
                    })
                }
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: "Valid animal id is required."
            })
        }
    }else{
        return res.status(400).json({
            success:false,
            message: "Try again after some time."
        })
    }
}
exports.addVaccine = async(req,res) => {
    const {name,uses,timeGapInDays,forBreed} = req.body;
    let vaccine = new Vaccine({
        name,uses,timeGapInDays,forBreed
    })
    vaccine = await vaccine.save()
    return res.json({
        success: true,
        message: "added"
    })
}
exports.vaccinationForAnimal = async(req,res) =>{
    if(mongoose.isValidObjectId(req.params.id) && mongoose.isValidObjectId(req.body.refId) && req.user.isAdmin!==0){
        
        let refm = await RefModel.findByIdAndUpdate(req.body.refId,{completed: true})
        
        if(refm){
            await totalcount.updateOne({type: "vaccineAdministered"},{$inc : {count : 1}})
            return res.status(200).json({
                success: true,
                message: "vaccination done successfully"
            })
        }else{
            return res.status(400).json({
                success:false,
                message: "Try again after some time."
            })
    }
    }else{
        return res.status(400).json({
            success:false,
            message: "Try again after some time."
        })
    }
}
exports.getValidMailIds = async(req,res) => {
    try{
        const animals = await Animal.find({gender: 'M', breed: req.query.breed}).select("id name gender")
        if(animals){
            return res.status(200).json({
                success: true,
                animals
            })
        }else{
            return res.status(400).json({
                success:false,
                message: "Unable to find matching male. Try again after some time!!!"
            })
        }
    }catch(err){
        return res.status(400).json({
            success:false,
            message: "Unable to find matching male. Try again after some time!!!"
        })
    }
}