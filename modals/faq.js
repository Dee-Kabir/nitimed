const mongoose = require('mongoose')
const faqSchema = new mongoose.Schema({
    sNo: {
        type: Number
    },
    question: {
        type: String,
        unique: true
    },
    answer: {
        type: String,
    }
},{timestamps: true})

module.exports = mongoose.model("Faq",faqSchema)