const mongoose = require('mongoose')
const diagonsticsSchema = new mongoose.Schema({
    sNo: {
        type: Number,
    },
    district: {
        type: String,
    },
    state: {
        type:String
    },
    diagonsticCenter: {
        type:String
    },
    contactNumber:{
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model("Diagonstic",diagonsticsSchema)