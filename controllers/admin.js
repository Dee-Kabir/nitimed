const jwt = require('jsonwebtoken')
const Admin = require('../modals/admin')
const Appointment = require('../modals/appointment')
const doctor = require('../modals/doctor')
exports.adminLogin = async(req,res) => {
    const {username,password} = req.body
    try{
        let admin = await Admin.findOne({username,password}).select("-password")
        if(admin){
            const token = jwt.sign({
                userId: admin.id,
                isAdmin: 3
            },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1d'
                    }
                )
            return res.status(200).json({success:true,user: admin,token: token})
        }else{
            return res.status(400).json({
                success: false,
                message: "Provide correct credentials"
            }) 
        }
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Provide correct credentials"
        })
    }
}
exports.adminRegister = async(req,res) => {
    try{
        let admin = await Admin.insertMany(req.body)
        if(admin){
            return res.status(200).json({
                success:true,
                message: "registered in"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Provide correct credentials"
        })
    }
}
exports.adminPendingAppointments = async(req,res) => {
    try{
        let appointments = await doctor.find({city: req.query.city,"appointments.pendingAppointments.0" : {$exists: true}}).select("name phone city state address")
        return res.status(200).json({
            success:true,
            doctors: appointments
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Provide correct credentials"
        })
    }
}
exports.getDoctorByNameAndCity = async(req,res) => {
    let {city,name} = req.query;
    try{
        let doctors = await doctor.find({city,name}).select("name phone city state address")
        return res.status(200).json({
            success:true,
            doctors: doctors
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Error!!!"
        })
    }
}