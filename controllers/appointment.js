const User = require('../modals/user')
const Doctor = require('../modals/doctor')
const Appointment = require('../modals/appointment')
const Animal = require("../modals/animal")
const mongoose = require('mongoose')

exports.createAppointment = async(req,res) => {
    const {amount,completed,doctorId,userId,order_id,payment_id,razorpay_signature,animal} = req.body;
    if(mongoose.isValidObjectId(doctorId) && mongoose.isValidObjectId(userId) && mongoose.isValidObjectId(animal)  && req.user.isAdmin===0){
    let appointment = new Appointment({
        amount,completed,doctor: doctorId,user: userId,order_id,payment_id,razorpay_signature,animal:animal ? animal : null
    })
    try{
        appointment = await appointment.save();
    User.findByIdAndUpdate(userId,{$push: {appointments : appointment}}
    ).then(()=>{
        Doctor.findByIdAndUpdate(doctorId,{
            $push : {'appointments.pendingAppointments': appointment}
        },{new:true}).then((data) => console.log(data))
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
    console.log(req.body.remark)
    if(mongoose.isValidObjectId(req.params.id)){
        Appointment.findByIdAndUpdate(req.params.id,{
            completed: req.body.completed
        }, {
            new: true
        }).then((appointment) => {
            if(!appointment){
                return res.status(400).json({
                    success:false, message: "Unable to save"
                })
            }else{
                Doctor.findByIdAndUpdate(appointment.doctor,{$pull : {'appointments.pendingAppointments': appointment._id},
                $push : {'appointments.completedAppointments' : appointment._id}
                }).then(()=>{
                    Animal.findByIdAndUpdate(appointment.animal,{$push : {'remarks': req.body.remark}}).then(()=>{
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
    if(mongoose.isValidObjectId(req.params.id)){
        Appointment.findById(req.params.id).populate('user','name address phone state city email').then(appointment => {
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
    Appointment.countDocuments({completed: true},(err,count)=>{
        return res.json({consultationCompleted: count,inseminationCompleted: 0,vaccineAdministered: 0,creditCards: 0,insuranceRolledOut: 0})
    })
}