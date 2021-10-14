const Animal = require('../modals/animal')
const User = require('../modals/user')
const RefModel = require('../modals/refModel')
const mongoose = require('mongoose')
const Vaccine = require('../modals/vaccine')
exports.addAnimals = async(req,res) => {
    Animal.insertMany(req.body.animals
        )
}
exports.getAnimalInfo = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id)){
        const animal = await Animal.findById(req.params.id).populate({path : 'vaccines',populate: {
            path: 'onThis'
        }}).select('name id age breed registrationId gender vaccines semination')
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
    if(mongoose.isValidObjectId(req.params.id)){
        const animals = await Animal.find({owner : req.params.id}).select('name id age breed registrationId gender')
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
            let animal = new Animal({
                name,registrationId,age,gender,breed,owner : req.params.id
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
            done: false
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
    if(mongoose.isValidObjectId(req.params.id) && mongoose.isValidObjectId(req.body.semineId)){
        let refm = new RefModel({
            onThis : req.body.semineId,
            onModel : 'Insemination',
            done: false
        })
        refm = await refm.save();
        if(refm){
            const animal = await Animal.findByIdAndUpdate(req.params.id,{
                $push : {semination : refm.id}
            },{
                new: true
            })
            if(animal){
                return res.status(200).json({
                    success: true,
                    message: "semination booked successfully"
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
exports.getVaccines = async(req,res) => {
    const {forBreed} = req.body;
    const vaccines = await Vaccine.find({forBreed :{$regex: forBreed, $options: 'i'} })
    if(vaccines){
        return res.status(200).json({
            success:true,
            vaccines
        })
    }else{
        return res.status(400).json({
            success:false,
            error: "Try again after some time."
        })
    }
}
