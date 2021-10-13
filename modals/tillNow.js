const mongoose = require('mongoose')
const tillNowSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    docName: {
        type: String,
    }
},{timestamps: true})

module.exports = mongoose.model("tillNow",tillNowSchema)