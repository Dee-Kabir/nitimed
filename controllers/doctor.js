const Doctor = require('../modals/doctor')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const excelToJson = require('convert-excel-to-json');
const tillNow = require('../modals/tillNow');

exports.addDoctors = async(req,res) => {
    tillNow.insertMany(req.body.doctors)
}
exports.getDoctorList = async(req,res) => {
    if(req.user.isAdmin === 3){
        const doctorList = await Doctor.find().select('-appointments')
        if(!doctorList){
            return res.status(400).json({
                success: false,
                message: "Not found. Try Again!"
            })
        }
    res.send(doctorList)
    }else{
        return res.status(400).json({
            success: false,
            message: "Not Authorized"
        })
    }
    
}
exports.getDoctor = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id)){
        const doctor = await Doctor.findById(req.params.id).populate('hospital','id').select('-appointments');
        if(!doctor){
            return res.status(400).json({
                success: false,
                message: "no doctor found"
            })
        }else{
            if(req.user.userId === req.params.id || req.user.isAdmin === 3 || req.user.userId === doctor.hospital.id){
                return res.json({success:true,user:doctor})  
            }else
            return res.status(400).json({
                success: false,
                message: "Not a valid Id"
            })
        } 
          
    }else{
        return res.status(400).json({
            success: false,
            message: "Not a valid Id or no doctor found"
        })   
    }
}
exports.createDoctor = async(req,res) => {
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
        workTime} = req.body

    let doctor= new Doctor({
        name,
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
        workTime
    })
    if(weekdays){
        let weekDays = weekdays.split(',')
        doctor.weekdays = [...weekDays]   
    }
    try{
        doctor = await doctor.save()
        let updatingPhoto = {}
        // console.log(`${basePathPhoto}${req.files['photo'][0].filename}`)
        if(req.files['photo']){
            updatingPhoto = {...updatingPhoto,photo : `${basePathPhoto}${req.files['photo'][0].filename}`}
        }
        if(req.files['proof']){
            updatingPhoto = {...updatingPhoto,proof : `${basePathProof}${req.files['proof'][0].filename}`}

        }
        // console.log(updatingPhoto)

        Doctor.findByIdAndUpdate(doctor._id,
            updatingPhoto
        ,{new :true})
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Already registered with these details."
        })
    }
    if(!doctor){
        return res.status(400).json({
            success: false,
            message: "Unable to save. Try Again!"
        })
    }
    res.json({success:true,message:"created successfully"})
}
exports.registerDoctor = async(req,res) => {
    const basePathPhoto = `${req.protocol}://${req.get('host')}/public/upload/photo/`;
    const basePathProof = `${req.protocol}://${req.get('host')}/public/upload/proof/`;
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
    timing} = req.body
        
    let doctor= new Doctor({
        name,
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
        workTime,
        timing
    })
    if(typeof(weekdays) === 'string'){
         let weekDays = weekdays.split(',')
         doctor.weekdays = [...weekDays]   
    }
    try{
        doctor = await doctor.save()
        let updatingPhoto = {}
        // console.log(`${basePathPhoto}${req.files['photo'][0].filename}`)
        if(req.files['photo']){
            updatingPhoto = {...updatingPhoto,photo : `${basePathPhoto}${req.files['photo'][0].filename}`}
        }
        if(req.files['proof']){
            updatingPhoto = {...updatingPhoto,proof : `${basePathProof}${req.files['proof'][0].filename}`}

        }
        // console.log(updatingPhoto)

        doctor = await Doctor.findByIdAndUpdate(doctor._id,
            updatingPhoto
        ,{new :true})
        if(!doctor){
            return res.status(400).json({
                success: false,
                message: "Unable to save. Try Again!"
            })
        }else
        return res.json({success:true,userId : doctor.id,message:"registered successfully"})
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Already registered with these details."
        })
    }
    
}
const uploadMultipleImages = async(req,res,id) => {
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
    if(files){
        files.map(file => {
            imagesPaths.push(`${basePath}${file.filename}`)
        })
    }
    const doctor = await Doctor.findByIdAndUpdate(
        id,
        {
            photo: imagesPaths,
            proof: imagesPaths
        },
        {
            new: true
        }
    )
    if(!doctor){
        return res.status(500).json({
            success: true,message : "The images can't be updated!"
        })
    }
    res.status(200).json({
        success : true, message: "Images Updated"
    })
}
exports.loginDoctor = async(req,res) => {
    const doctor = await Doctor.findOne({phone: req.body.phone})
    if(!doctor){
        return res.status(400).send('Doctor not found')
    }
   
        const token = jwt.sign({
            userId: doctor.id,
            isAdmin: doctor.isAdmin
        },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )
        res.status(200).json({user: doctor,token: token})
    
}
exports.getCount = async(req,res) => {
    if(req.user.isAdmin === 3){
        const doctorCount = await Doctor.countDocuments((count) => count)
    if(!doctorCount){
        return res.status(400).json({success: false,message: "Error Try Again!"})
    }
    res.send({
        doctorCount: doctorCount
    })
    }else{
        return res.status(400).json({success: false,message: "Not Authorized"})
    }
    
}
exports.deleteDoctor = async(req,res) => {
    if( mongoose.isValidObjectId(req.params.id) && (req.user.userId === req.params.id || req.user.isAdmin === 3 )){
        Doctor.findByIdAndRemove(req.params.id).then(doctor => {
            if(doctor){
                return res.status(200).json({success: true, message: 'The doctor is deleted'})
            }else{
                return res.status(400).json({success: false, message: "doctor id not found"})
            }
        }).catch(err => {
            return res.status(500).json({success: false,error: err})
        })
    }else{
        return res.status(500).json({success: false,message: "Either the ID is not valid or you are not authorized for this operation"})
    }
    
}
exports.updateDoctor = async(req,res) => {
    if( mongoose.isValidObjectId(req.params.id) && (req.user.userId === req.params.id || req.user.isAdmin === 3)){
        const {name,email,qualification,address,state,city,jobType,servingType,workTime,weekdays,speciality,fee,timing} = req.body;
    Doctor.findByIdAndUpdate(req.params.id,{
        name,email,qualification,address,state,city,jobType,servingType,workTime,weekdays,speciality,fee,timing
    }).then(doctor => {
        if(doctor){
            return res.status(200).json({success: true,user:doctor, message: 'the doctor is updated'})
        }else{
            return res.status(400).json({success: false, message: "user id not found"})
        }
    }).catch(err => {
        console.log(err)
        return res.status(500).json({success: false,error: err})
    })
}
else{
    return res.status(500).json({success: false,message: "Either the ID is not valid or you are not authorized for this operation"})
}
}
exports.getPendingAppointments = async(req,res) => {
    //  && (req.user.userId === req.params.id || req.body.hospitalId === req.user.userId)
    if( mongoose.isValidObjectId(req.params.id)){
        Doctor.findById(req.params.id).populate({path: 'appointments.pendingAppointments', populate: {
            path : 'user' , select : 'name'
    }
 }).select('appointments.pendingAppointments')
 .then(pAppoint => {
    if(!pAppoint){
        return res.status(400).json({
            success: false,
            message : 'An error occurred'
        })
    }
    return res.status(200).json({success: true,appointments : pAppoint.appointments})
}).catch(err => {
    console.log(err)
    res.status(400).json({
    success: false,
    message: "An error occurred or invalid request"
})}) 
    }
    else{
        return res.status(500).json({success: false,message: "Either the ID is not valid or you are not authorized for this operation"})
    }
}
exports.getCompletedAppointments = async(req,res) => {
    if(  mongoose.isValidObjectId(req.params.id)){
        Doctor.findById(req.params.id).populate({path: 'appointments.completedAppointments', populate: { 
            path : 'user' , select : 'name'
    }
    }).select('appointments.completedAppointments').then(pAppoint => {
        if(!pAppoint){
            return res.status(400).json({
                success: false,
                message : 'An error occurred'
            })
        }
        return res.status(200).json({success: true,appointments : pAppoint.appointments})
    }).catch(err => res.status(400).json({
        success: false,
        message: "An error occurred or invalid request"
    }))  
    }
    else{
        return res.status(500).json({success: false,message: "Either the ID is not valid or you are not authorized for this operation"})
    }
}
exports.getDoctorByQuery = async(req,res) => {
    const {category, name} = req.query
    let filter = {[category] : {$regex : name, $options: 'i'}};
    try{
        Doctor.find(filter).select('id name address email phone city state available fee jobType servingType speciality weekdays workTime').then(doctor => {
            if(!doctor){
                return res.status(400).json({
                    success: false,message: "Provide a valid query"
                })
            }
            if(doctor.length > 0){
                return res.status(200).json({
                    success: true, doctors: doctor
                })
            }else if(doctor.length===0){
                return res.status(400).json({
                    success: true,message: "No doctor found"
                })
            }
        })
    }catch(err){
        return res.status(400).json({
            success: false,message: "Provide a valid query"
        })
    }
    
}
exports.doctorExists = async(req,res) => {
    const doctor = await Doctor.findOne({phone: req.params.id})
    if(!doctor){
        return res.status(400).json({
            success: false,
        })
    }
    res.json({success:true})
}
exports.getDoctorPhone = async(req,res) => {
    const doctor = await Doctor.findOne({phone: req.params.id}).select('-appointments')
    if(!doctor){
        return res.status(400).json({
            success: false,
        })
    }
    const token = jwt.sign({
        userId: doctor.id,
        isAdmin: doctor.isAdmin
    },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )
    res.status(200).json({success:true,user: doctor,token: token})
}
exports.setRoomIdDoctor = async(req,res) => {
    if( mongoose.isValidObjectId(req.params.id)){
    Doctor.findByIdAndUpdate(req.params.id,{
        roomId : req.body.roomId
    },{
        new: true
    }).then((data)=> {
        if(data){
            return res.status(200).json({
                success: true,message : "Room Id saved"
            })
        }else{
            return res.status(400).json({
                succcess: false, message: "Create room Id again"
            })
        }
    } ).catch(err => {
        return res.status(400).json({
        success: false, message : "Error occurred.Please try again!"
    })})
    }else{
        return res.status(400).json({
            success: false,message: "Not Authorized!!"
        }) 
    }
}
exports.changeAvailablity = async(req,res) => {
    // && (req.user.userId === req.params.id || req.user.isAdmin === 3 )
    if( mongoose.isValidObjectId(req.params.id) ){
        Doctor.findByIdAndUpdate(req.params.id,{
            available : req.body.available
        },{
            new:true
        })
        .select('-appointments')
        .then((doctor) => {
            if(doctor){
                return res.status(200).json({
                    success:true, user: doctor
                })
            }else{
                return res.status(400).json({
                    success:false,
                    message: "No doctor Found"
                })
            }
        }).catch(err => {
            return res.status(400).json({
            success:false,
            message: "No doctor Found"
        })})
    }else{
        return res.status(400).json({
            success:false,
            message: "Not Authorised"
        })
    }
    
}
exports.registerDoctors = (req,res) =>{
    const excelData = excelToJson({
        sourceFile: 'D:/Desktop files/niti/doctorsList.xlsx',
        sheets:[{
            // Excel Sheet Name
            name: 'VO',
            
            // Header Row -> be skipped and will not be present at our result object.
            header:{
                rows: 1
            },
            // Mapping columns to keys
            columnToKey: {
                A: 'city',
                B: 'name',
                C: 'phone',
                D: 'email',
                E: 'gujSVC_Regi_No',
                F: 'available',
                G : 'state',
                H : 'jobType',
                I: 'servingType',
                J: 'workTime'
            }
        }]
    });
    // excelData.VO.map(async(doctor) =>  await Doctor.updateMany({phone: doctor.phone},{phone: "+91"+doctor.phone}));
    // Doctor.insertMany(excelData.VO).then((data)=> {
    //     return res.json({excelData})
    // })
    // Doctor.updateMany({},{phone});
    return res.json({excelData})
}
