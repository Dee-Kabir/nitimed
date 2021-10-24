const mongoose = require('mongoose')
const dispensarySchema = new mongoose.Schema({
    sNo: {
        type: Number,
    },
    district: {
        type: String,
    },
    state: {
        type:String
    },
    dispensaryName: {
        type:String
    },
    contactNumber:{
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model("Dispensary",dispensarySchema)