const excelToJson = require('convert-excel-to-json')
const Diagonstics = require('../modals/diagonstics')
const Disease = require('../modals/disease')
const Dispensary = require('../modals/dispensary')
const FAQ = require('../modals/faq')
const Services = require('../modals/services')
const TillNow = require('../modals/tillNow')
const mapModals = {
    "Diagonstic" : Diagonstics,
    "Disease" : Disease,
    "Dispensary" : Dispensary
}
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
exports.getListOfCenters = async(req,res) => {
    let {limit,which,what} = req.query;
    limit = parseInt(limit)
    mapModals[which].find().limit(99).skip(limit).then((data)=>{
        if(data)
        return res.status(200).json({
            success : true,
            [what] : data
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

exports.getListOfCentersByName = async(req,res) =>{
    let {fields,name,what,which} = req.query;
    let queryArr = fields.split(",").map((field) => ({
            [field] : {$regex:name,$options: "i"}
        }))
    mapModals[which].find({$or : queryArr}).then((data)=>{
        if(data)
        return res.status(200).json({
            success : true,
            [what] : data
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
exports.postDisease = (req,res) =>{
    const excelData = excelToJson({
        sourceFile: 'C:/Users/Deepanshu yadav/Desktop/disease.xlsx',
        sheets:[{
            // Excel Sheet Name
            name: 'Disease',
            
            // Header Row -> be skipped and will not be present at our result object.
            header:{
                rows: 1
            },
            // Mapping columns to keys
            columnToKey: {
                A: 'sNo',
                B: 'speciesName',
                C: 'diseaseName',
                D: 'diseaseSymptoms',
            }
        }]
    });
    // Disease.insertMany(excelData.Disease).then((data)=> {
    //     return res.json({excelData})
    // })
    // console.log(excelData)
    return res.json({excelData})
}
exports.postDispensary = (req,res) =>{
    const excelData = excelToJson({
        sourceFile: 'C:/Users/Deepanshu yadav/Desktop/dispensary_list.xlsx',
        sheets:[{
            // Excel Sheet Name 
            name: 'dispensary',
            
            // Header Row -> be skipped and will not be present at our result object.
            header:{
                rows: 1
            },
            // Mapping columns to keys
            columnToKey: {
                A: 'sNo',
                B: 'district',
                C: 'state',
                D: 'dispensaryName',
                E: 'contactNumber'
            }
        }]
    });
    // Dispensary.insertMany(excelData.Disease).then((data)=> {
    //     return res.json({excelData})
    // })
    console.log(excelData)
    return res.json({excelData})
}

exports.postDiagonstic = (req,res) =>{
    const excelData = excelToJson({
        sourceFile: 'C:/Users/Deepanshu yadav/Desktop/disease.xlsx',
        sheets:[{
            // Excel Sheet Name
            name: 'Disease',
            
            // Header Row -> be skipped and will not be present at our result object.
            header:{
                rows: 1
            },
            // Mapping columns to keys
            columnToKey: {
                A: 'sNo',
                B: 'district',
                C: 'state',
                D: 'diagonsticCenter',
                E: 'contactNumber'
            }
        }]
    });
    Diagonstics.insertMany(excelData.Disease).then((data)=> {
        return res.json({excelData})
    })
    // console.log(excelData)
    return res.json({excelData})
}