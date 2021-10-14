const User = require('../modals/user')
const Doctor = require('../modals/doctor')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Hospital = require('../modals/hospital')
exports.getUserList = async(req,res) => {
    let userList;
    try{
        userList = await User.find()
    }catch(err){
        return res.status(400).json({
            success: false
        })
    }
    if(!userList){
        return res.status(400).json({
            success: false
        })
    }
    res.send(userList)
}
exports.userExists = async(req,res) => {
    const user = await User.findOne({phone: req.params.id})
    if(!user){
        return res.status(400).json({
            success: false,
        })
    }
    res.json({success:true})
}
exports.getUser = async(req,res) => {
    if(req.user.userId === req.params.id || req.user.isAdmin === 3) 
    {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User Not found'
            })
        }
        return res.json({user:user,success:true})
    }
    else{
        return res.status(400).json({
            success: false,
            message: "Validation Error"
        })
    }
}
exports.createUser = async(req,res) => {
    const {name,email,phone,isAdmin,address,city,state} = req.body
    let user= new User({
        name:name,phone,isAdmin,email: email,address,city:city,state,
    })
    try{
        user = await user.save()
    }catch{
        return res.status(400).json({
            success: false,
            message: "Already registerd with these details."
        })
    }
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Try Again!"
        })
    }
    res.send("created successfully")
}
exports.getUserPhone = async(req,res) => {
    const user = await User.findOne({phone: req.params.id})
    if(!user){
        return res.status(400).json({
            success: false,
        })
    }
    const token = jwt.sign({
        userId: user.id,
        isAdmin: user.isAdmin
    },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )
    res.status(200).json({success: true,user: user,token: token})
}
exports.registerUser = async(req,res) => {
    const {name,email,phone,isAdmin,address,city,state} = req.body
    let user= new User({
        name,phone,isAdmin,email,address,city,state
    })
    try{
        user = await user.save()
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Already registerd with these details."
        })
    }
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Try Again!"
        })
    }
   
    res.json({success: true})
}
exports.loginUser = async(req,res) => {
    const user = await User.findOne({phone: req.body.phone})
    if(!user){
        return res.status(400).send('User not found')
    }
    if(user){
        const token = jwt.sign({
            userId: user.id,
            isAdmin: user.isAdmin
        },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )
        res.status(200).json({user: user,token: token})
    }else{
        res.status(400).send('Error while logging in!')
    }
}
exports.getCount = async(req,res) => {
    const userCount = await User.countDocuments((count) => count)
    if(!userCount){
        return res.status(400).json({success: false})
    }
    res.send({
        userCount: userCount
    })
}
exports.deleteUser = async(req,res) => {
    if(req.user.userId === req.params.id || req.user.isAdmin === 3) {
        User.findByIdAndRemove(req.params.id).then(user => {
            if(user){
                return res.status(200).json({success: true, message: 'the user is deleted'})
            }else{
                return res.status(400).json({success: false, message: "user id not found"})
            }
        }).catch(err => {
            return res.status(500).json({success: false,error: err})
        })
    }else{
        return res.status(400).json({success: false, message: "user id not found"})
    }
    
}
exports.updateUser = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id) && (req.user.userId === req.params.id || req.user.isAdmin === 3)) {
    User.findByIdAndUpdate(req.params.id,req.body).then(user => {
        if(user){
            return res.status(200).json({success: true,user:user, message: 'the user is updated'})
        }else{
            return res.status(400).json({success: false, message: "user id not found"})
        }
    }).catch(err => {
        return res.status(500).json({success: false,message: err})
    })
}
else{
    return res.status(400).json({success: false, message: "user id not found"})
}
}
exports.getAppointments = async(req,res) => {
    if(req.user.userId === req.params.id || req.user.isAdmin === 3) {
    User.findById(req.params.id).populate({path : 'appointments', populate : {
        path : 'doctor',
        select : 'name'
    }}).then(appointments => {
        if(!appointments){
            return res.status(400).json({
                success: false,
                message: "Error while fetching appointments"
            })
        }
        return res.status(200).json({success: true,appointments:appointments.appointments})
    }).catch(err => {
        console.log(err)
        res.status(400).json({
        success: false,
        message: err
    })})
}
else{
    return res.status(400).json({success: false, message: "user id not found"})
}
}
exports.getRoomId = async(req,res) => {
    if(mongoose.isValidObjectId(req.params.id)){
        Doctor.findById(req.params.id).then(data => {
            if(data){
                return res.status(200).json({
                    success: true,
                    roomId : data.roomId
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message: "Doctor not found"
                })
            }
        }).catch(err => res.status(400).json({
            success: false,
            message: "Doctor not found.Try Again!"
        }))
    }else{
        return res.status(400).json({
            success: false,
            message: "Doctor not found"
        })
    }
}
exports.checkUserType = async(req,res) => {
    const {userId,isAdmin} = req.user;
    if(isAdmin===0){
        const user = await User.findById(userId).select('-appointments');
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User Not found'
            })
        }
        return res.json({user:user,success:true})
    }else if(isAdmin===1){
        const user = await Doctor.findById(userId).populate('hospital','id').select('-appointments');;
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Doctor Not found'
            })
        }
        return res.json({user:user,success:true})
    }else if(isAdmin===2){
        const hospital = await Hospital.findById(userId)
        if(!hospital){
            return res.status(400).json({
                success: false,
                message : "No hospital Found."
            })
        }else{
            return res.status(200).json({
                success: true,
                user : hospital 
            })
        }
    }
}