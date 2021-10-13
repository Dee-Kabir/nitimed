const mongoose = require('mongoose')
const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    desc: {
        type: String,
    },
    link : {
        type: String,
    }
},{timestamps: true})

module.exports = mongoose.model("Service",serviceSchema)