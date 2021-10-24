const mongoose = require('mongoose')
const diseaseSchema = new mongoose.Schema({
    sNo: {
        type: Number,
    },
    speciesName: {
        type: String,
    },
    diseaseName: {
        type:String
    },
    diseaseSymptoms: {
        type:String
    }
},{timestamps: true})

module.exports = mongoose.model("Disease",diseaseSchema)