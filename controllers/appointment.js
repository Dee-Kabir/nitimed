const User = require('../modals/user')
const Doctor = require('../modals/doctor')
const Appointment = require('../modals/appointment')
const Animal = require("../modals/animal")
const Vaccination = require("../modals/vaccination")
const mongoose = require('mongoose')
const Insemination = require('../modals/Insemination')
const refModel = require('../modals/refModel')
const helper = {
    "appointments" : [Appointment,"pendingAppointments","completedAppointments"],
    "vaccinations" : [Vaccination,"pendingVaccinations","completedVaccinations"],
    "inseminations" : [Insemination, "pendingInseminations","completedInseminations"]
}
exports.createAppointment = async(req,res) => {
    const {amount,completed,doctorId,userId,order_id,payment_id,razorpay_signature,animal} = req.body;
    if(mongoose.isValidObjectId(doctorId) && mongoose.isValidObjectId(userId) && mongoose.isValidObjectId(animal)  && req.user.isAdmin===0){
    let appointment = new Appointment({
        amount,completed,doctor: doctorId,user: userId,order_id,payment_id,razorpay_signature,animal:animal ? animal : null
    })
    try{
        appointment = await appointment.save();
    await User.findByIdAndUpdate(userId,{$push: {appointments : appointment}}
    ).then(async ()=>{
        await Doctor.findByIdAndUpdate(doctorId,{
            $push : {'appointments.pendingAppointments': appointment}
        },{new:true})
    })
    if(!appointment){
        return res.status(400).json({
            success:false, message: "Unable to save"
        })
    }
    res.status(200).json({
        success:true,message: "Appointment confirmed"
    })}
    catch{
        return res.status(400).json({
            success:false, message: "Unable to save"
        })
    }
}
    else{
        return res.status(400).json({
            success:false, message: "Unable to Book"
        })
    }
}
exports.updateAppointment = async(req,res) => {
    const {category,completed,remark} = req.body;
    if(mongoose.isValidObjectId(req.params.id)){
        helper[category][0].findByIdAndUpdate(req.params.id,{
            completed: completed
        }, {
            new: true
        }).then((appointment) => {
            if(!appointment){
                return res.status(400).json({
                    success:false, message: "Unable to save"
                })
            }else{
                Doctor.findByIdAndUpdate(appointment.doctor,{$pull : {[`${category}.${helper[category][1]}`]: appointment._id},
                $push : {[`${category}.${helper[category][2]}`] : appointment._id}
                }).then(()=>{
                    Animal.findByIdAndUpdate(appointment.animal,{$push : {'remarks': remark}}).then(()=>{
                        return res.status(200).json({
                            success:true,message: "Appointment updated"
                        })
                    }).catch(err => {
                        return res.status(400).json({
                            success:false,message: err
                        })
                    })
                    
                })
            }
        }).catch(err => 
            res.status(400).json({
                success:false,message: err
            })
            )
    }else{
        return res.status(400).json({
            success: 'false',
            message: "Unable to update."
        })
    }
}
exports.getAppointment = async(req,res) => {
    const {category} = req.query;
    console.log(category)
    if(mongoose.isValidObjectId(req.params.id)){
        helper[category][0].findById(req.params.id).populate('user','name address phone state city email').then(appointment => {
            if(!appointment){
                return res.status(400).json({
                    success:false,message: "Appointment not found"
                })
            }else{
                return res.status(200).json({
                    success:true,appointment: appointment
                })
            }
        }).catch(err => {
            res.status(400).json({
                success:false,message: err
            })
        })
    }else{
        return res.status(400).json({
            success: 'false',
            message: "Unable to get the appointment."
        })
    }
}
exports.getCountAppointments = async(req,res) => {
    let vaccineAdministered = await Vaccination.countDocuments({completed: true},(err,count)=>{
        return count;
    }).clone()
    let consultationCompleted = await Appointment.countDocuments({completed: true},(err,count)=>{
        return count;
    }).clone()
    let inseminationCompleted = await refModel.countDocuments({onModel: "Animal",completed: true},(err,count)=>{
        return count;
    }).clone()
    return res.json({consultationCompleted: consultationCompleted,inseminationCompleted: inseminationCompleted,vaccineAdministered: vaccineAdministered,creditCards: 0,insuranceRolledOut: 0})
}
exports.createVaccination = async(req,res) => {
    const {amount,completed,doctorId,userId,order_id,payment_id,razorpay_signature,animal} = req.body;
    if(mongoose.isValidObjectId(doctorId) && mongoose.isValidObjectId(userId) && mongoose.isValidObjectId(animal)  && req.user.isAdmin===0){
        try{
            let vaccination = new Vaccination({
        amount,completed,doctor: doctorId,user: userId,order_id,payment_id,razorpay_signature,animal:animal ? animal : null
        })
    
        vaccination = await vaccination.save();
        await User.findByIdAndUpdate(userId,{$push: {vaccinations : vaccination}}
        ).then(async ()=>{
        await Doctor.findByIdAndUpdate(doctorId,{
            $push : {'vaccinations.pendingVaccinations': vaccination}
        },{new:true})
    })
    if(!vaccination){
        return res.status(400).json({
            success:false, message: "Unable to save"
        })
    }
    return res.status(200).json({
        success:true,message: "vaccination booking confirmed"
    })}
    catch{
        return res.status(400).json({
            success:false, message: "Unable to save"
        })
    }
}
    else{
        return res.status(400).json({
            success:false, message: "Unable to Book"
        })
    }
}
exports.createSeminationBooking = async(req,res) => {
    const {amount,completed,doctorId,userId,order_id,payment_id,razorpay_signature,animal} = req.body;
    if(mongoose.isValidObjectId(doctorId) && mongoose.isValidObjectId(userId) && mongoose.isValidObjectId(animal)  && req.user.isAdmin===0){
        try{
            let insemination = new Insemination({
        amount,completed,doctor: doctorId,user: userId,order_id,payment_id,razorpay_signature,animal:animal ? animal : null
        })
    
        insemination = await insemination.save();
        await User.findByIdAndUpdate(userId,{$push: {inseminations : insemination}}
        ).then(async ()=>{
        await Doctor.findByIdAndUpdate(doctorId,{
            $push : {'inseminations.pendingInseminations': insemination}
        },{new:true})
    })
    if(!insemination){
        return res.status(400).json({
            success:false, message: "Unable to save"
        })
    }
    return res.status(200).json({
        success:true,message: "Artificial Insemination booking confirmed"
    })}
    catch{
        return res.status(400).json({
            success:false, message: "Unable to save"
        })
    }
}
    else{
        return res.status(400).json({
            success:false, message: "Unable to Book"
        })
    }
}