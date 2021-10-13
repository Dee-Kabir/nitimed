const User = require('../modals/user')
const Doctor = require('../modals/doctor')
const Appointment = require('../modals/appointment')
const mongoose = require('mongoose')

exports.createAppointment = async(req,res) => {
    const {amount,completed,doctorId,userId,order_id,payment_id,razorpay_signature,animal} = req.body;
    if(mongoose.isValidObjectId(doctorId)){
    let appointment = new Appointment({
        amount,completed,doctor: doctorId,user: userId,order_id,payment_id,razorpay_signature,animal:animal ? animal : null
    })
    try{
        appointment = await appointment.save();
    }catch{
        return res.status(400).json({
            success:false, message: "Unable to save"
        })
    }
    User.findByIdAndUpdate(userId,{$push: {appointments : appointment}}
    ).then(()=>{
        Doctor.findByIdAndUpdate(doctorId,{
            $push : {'appointments.pendingAppointments': appointment}
        },{new:true}).then(data => console.log(data))
    })
    if(!appointment){
        return res.status(400).json({
            success:false, message: "Unable to save"
        })
    }
    res.status(200).json({
        success:true,message: "Appointment confirmed"
    })}
    else{
        return res.status(400).json({
            success:false, message: "Unable to save"
        })
    }
}
exports.updateAppointment = async(req,res) => {
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
            console.log(appointment)
            Doctor.findByIdAndUpdate(appointment.doctor,{$pull : {'appointments.pendingAppointments': appointment._id},
            $push : {'appointments.completedAppointments' : appointment._id}
            }).then(()=>{
                return res.status(200).json({
                    success:true,message: "Appointment updated"
                })
            })
        }
    }).catch(err => 
        res.status(400).json({
            success:false,message: err
        })
        )
}
exports.getAppointment = async(req,res) => {
    Appointment.findById(req.params.id).populate({path: 'animal',populate: {
        path:'vaccines'
    }}).then(appointment => {
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
}
exports.getCountAppointments = async(req,res) => {
    Appointment.countDocuments({completed: true},(err,count)=>{
        return res.json({consultationCompleted: count,inseminationCompleted: 0,vaccineAdministered: 0,creditCards: 0,insuranceRolledOut: 0})
    })
}