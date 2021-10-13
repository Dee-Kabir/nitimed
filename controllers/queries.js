const FAQ = require('../modals/faq')
const Services = require('../modals/services')
const TillNow = require('../modals/tillNow')

exports.getFaq = async(req,res) => {
    FAQ.find().then((data)=>{
        if(data)
        return res.status(200).json({
            success: true,
            faq: data
        })
        else{
            return res.status(400).json({
                success: false,
                message: "No data found"
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "No data found"
        })
    })
}
exports.getServices = async(req,res) => {
    Services.find().then((data)=>{
        if(data)
        return res.status(200).json({
            success: true,
            services: data
        })
        else{
            return res.status(400).json({
                success: false,
                message: "No data found"
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "No data found"
        })
    })
}
exports.getTillNow = async(req,res) => {
    TillNow.find().then((data)=>{
        if(data)
        return res.status(200).json({
            success : true,
            tillNow : data
        })
        else{
            return res.status(400).json({
                success : false,
                message : "No data found"
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success : false,
            message : "No data found"
        })
    })
}
exports.postFaq = async(req,res) => {
    FAQ.create(req.body).then((data)=>{
        if(data){
            return res.status(200).json({
                success: true,
                message: "Added successfully"
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Try Again after sometime."
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "Try Again after sometime."
        })
    })
}
exports.postTillNow = async(req,res) => {
    TillNow.create(req.body).then((data)=>{
        if(data){
            return res.status(200).json({
                success: true,
                message: "Added successfully"
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Try Again after sometime."
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "Try Again after sometime."
        })
    })
}
exports.postServices = async(req,res) => {
    Services.create(req.body).then((data)=>{
        if(data){
            return res.status(200).json({
                success: true,
                message: "Added successfully"
            })
        }else{
            return res.status(400).json({
                success: false,
                message: "Try Again after sometime."
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "Try Again after sometime."
        })
    })
}
