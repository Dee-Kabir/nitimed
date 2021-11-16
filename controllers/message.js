const Message = require('../modals/message');
const Appointment = require('../modals/appointment')
const Vaccination = require('../modals/vaccination')
const Insemination = require('../modals/Insemination')
const typeOfAppointment = {
    'appointments' : Appointment,
    'vaccinations' : Vaccination,
    'inseminations' : Insemination
}
exports.postMessage = async(req,res) => {
    const {typeOfUser,text,userId,category} = req.body;
    try{
        Message.create({text,
        onModel: typeOfUser,
    author: userId}).then((message) => {
        if(message){
            typeOfAppointment[category].findByIdAndUpdate(req.params.id,{$push: {messages: message}},{new: true}).populate('messages').select('messages').then(appointment => {
                if(appointment){
                    return res.json({
                        success: true,
                        messages: appointment.messages
                    })
                }else{
                    return res.json({
                        success:false,
                        message : "Error!!!"
                    })
                }
            })
        }else{
            return res.json({
                success:false,
                message : "Error!!!"
            })
        }
    })
    }catch(err){
        return res.json({
            success:false,
            message : "Error!!!"
        })
    }
}
exports.getMessages = async(req,res) => {
    const {category} = req.query;
    try{
        typeOfAppointment[category].findById(req.params.id).populate('messages').select('messages').then(appointment => {
            if(appointment) {
                return res.status(200).json({
                    success: true,
                    messages: appointment.messages
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message : "Error!!!"
                })
            }
        })
    }catch(err) {
        return res.status(400).json({
            success: false,
            message: "Error!!!"
        })
    }
}