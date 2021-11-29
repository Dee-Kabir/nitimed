const mongoose = require('mongoose')
const totalCountSchema = new mongoose.Schema({
    type: {
        type: String,
        unique: true
    },
    count: {
        type: Number,
    }
},{timestamps: true})

module.exports = mongoose.model("TotalCount",totalCountSchema)