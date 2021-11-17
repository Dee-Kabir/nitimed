const excelToJson = require('convert-excel-to-json')
const Diagonstics = require('../modals/diagonstics')
const Disease = require('../modals/disease')
const Dispensary = require('../modals/dispensary')
const FAQ = require('../modals/faq')
const TillNow = require('../modals/tillNow')
const Vaccine = require('../modals/vaccine')
const mapModals = {
    "Diagonstic" : Diagonstics,
    "Disease" : Disease,
    "Dispensary" : Dispensary,
    "Faq" : FAQ,
    "Vaccine" : Vaccine
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
exports.getVaccines = async(req,res) => {
    const vaccines = await Vaccine.find()
    if(vaccines){
        return res.status(200).json({
            success:true,
            vaccines
        })
    }else{
        return res.status(400).json({
            success:false,
            error: "Try again after some time."
        })
    }
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
    // FAQ.create(req.body).then((data)=>{
    //     if(data){
    //         return res.status(200).json({
    //             success: true,
    //             message: "Added successfully"
    //         })
    //     }else{
    //         return res.status(400).json({
    //             success: false,
    //             message: "Try Again after sometime."
    //         })
    //     }
    // }).catch(err => {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Try Again after sometime."
    //     })
    // })
    const excelData = excelToJson({
        sourceFile: 'C:/Users/Deepanshu yadav/Desktop/faq.xlsx',
        sheets:[{
            // Excel Sheet Name 
            name: 'Sheet1',
            
            // Header Row -> be skipped and will not be present at our result object.
            // header:{
            //     rows: 1
            // },
            // Mapping columns to keys
            columnToKey: {
                A: 'sNo',
                B: 'question',
                C: 'answer',
            }
        }]
    });
    FAQ.insertMany(excelData.Sheet1).then((data)=> {
        return res.json({excelData})
    })
    // console.log(excelData)
    // return res.json({excelData})
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

exports.postData = async(req,res) => {
    let locationOfFile = req.body.fileLocation;
    let sheetName = req.body.sheetName;
    // console.log(req.files);
    // console.log(req.body);
    let columnsInFile = req.body.columnsInFile
    let modalName = req.body.modalName
    const excelData = excelToJson({
        sourceFile: locationOfFile,
        sheets:[{
            // Excel Sheet Name
            name: sheetName,
            
            // Header Row -> be skipped and will not be present at our result object.
            header:{
                rows: 1
            },
            // Mapping columns to keys
            columnToKey: columnsInFile
        }]
    });
    // console.log(excelData)
    mapModals[modalName].insertMany(excelData[sheetName]).then((data)=> {
        return res.json({excelData})
    })
}