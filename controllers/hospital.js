const Hospital = require('../modals/hospital')
const Doctor = require('../modals/doctor')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

exports.registerHospital = async(req,res) => {
    const {name,email,phone,address,state,city,hospitalRegistration,password} = req.body
    // const salt = bcrypt.genSaltSync(10)
    // console.log(salt);
    try{
        let hospital = await Hospital.findOne({$or : [{phone},{email}]})
    
        if(hospital){
            return res.status(400).json({
                success:false,
                message: "Already registered with this mobile number or email"
            })
        }else{
            hospital= new Hospital({
                name,email,phone,address,state,city,hospitalRegistration,password : bcrypt.hashSync(password,process.env.SECRET_PASS)
            })
            hospital = await hospital.save()
            if(!hospital){
                return res.status(400).json({
                    success: false,
                    message: 'All the details are necessary for registration.Try Again!'
                })
            }else{
                return res.status(200).json({
                    success:true,
                    message: 'Registerd Successfully'
                })
            }
            
        }
}catch(err){
    return res.status(400).json({
        success: false,
        message: err
    })
}
    
}
exports.loginHospital = async(req,res) => {
    const hospital = await Hospital.findOne({email: req.body.email})
    if(!hospital){
        return res.status(400).json({success: false, message: 'Hospital not found'})
    }
    if(hospital && bcrypt.compareSync(req.body.password,hospital.password)){
        const token = jwt.sign({
            userId: hospital.id,
            isAdmin: hospital.isAdmin
        },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )
        res.status(200).json({success: true,user: hospital,token: token})
    }else{
        res.status(400).json({success: false,message: 'Either password or username is not valid'})
    }
}
exports.getHospital = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id)){
        const hospital = await Hospital.findById(req.params.id)
        if(!hospital){
            return res.status(400).json({
                success: false,
                message : "No hospital Found."
            })
        }else{
            return res.status(200).json({
                success: true,
                hospital : hospital 
            })
        }
    }
    
}
exports.updateHospital = async(req,res) => { 
    if(mongoose.isValidObjectId(req.params.id) && req.user.userId === req.params.id){
        Hospital.findByIdAndUpdate(req.params.id,req.body).then(user => {
            if(user){
                return res.status(200).json({success: true,user:user, message: 'Hospital data is updated'})
            }else{
                return res.status(400).json({success: false, message: "Hospital id not found"})
            }
        }).catch(err => {
            return res.status(500).json({success: false,message: err})
        })
    }
}
exports.findHospitals = async(req,res) => {
    const hospital = await Hospital.find({[req.query.type] : { $regex: req.query.value,$options: 'i'}}).select('name id phone address state city')
    if(!hospital){
        return res.status(400).json({
            success: false,
            message : "No hospital Found."
        })
    }else{
        return res.status(200).json({
            success: true,
            hospitals : hospital 
        })
    }
}
exports.addDoctorToHospital = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id)){
        const {name,
            email,
            phone,
            isAdmin,
            address,
            city,
            state,
            fee,
            jobType,
            photo,
            proof,
            qualification,
            servingType,
            speciality,
            weekdays,
            workTime,
        timing,
    aadharNumber,
registrationNumber} = req.body.doctor
        let doctor = new Doctor({
            name,
            email,
            phone,
            isAdmin,
            address,
            city,
            state,
            fee,
            jobType,
            proof,
            qualification,
            servingType,
            speciality,
            weekdays,
            workTime,
            timing,
        aadharNumber,
    registrationNumber
        })
        try{
            doctor = await doctor.save()
        if(doctor){
            Hospital.findByIdAndUpdate(req.params.id,{
                $push : {doctors : doctor.id}
            },{
                new :true
            }).then((dataHospital) => {
                Doctor.findByIdAndUpdate(doctor.id,{
                    hospital : dataHospital.id
                },{new:true}).then((result)=>{
                    if(!result){
                        return res.status(400).json({
                            success : false,
                            message : "Unable to add doctor"
                        })
                    }else{
                        return res.status(200).json({
                            success : true,
                            message : "Added doctor Successfully"
                        })
                    }
                })
            })
        }else{
            return res.status(400).json({
                success : false,
                message : "Unable to add doctor"
            })
        }  
        }catch(err){
            return res.status(400).json({
                success : false,
                message : err.message
            })
        }
    }else{
        return res.status(400).json({
            success : false,
            message : "Unable to add doctor"
        })
    }
}
exports.getDoctorsOfHospital = async(req,res) => {
    const doctors = await Hospital.findById(req.params.id).populate('doctors','name id phone available jobType weekdays email state city fee timing aadharNumber registrationNumber').select('doctors')
    if(doctors){
        return res.status(200).json({
            success: true,
          doctors
        })
    }else{
        return res.status(400).json({
            success: false,
            message: "Error occurred while fetching!!!!"
        })
    }
}