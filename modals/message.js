const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const messageSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    author : {
        type: ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type:String,
        required: true,
        enum: ['User','Doctor']
    },
},{timestamps: true})

module.exports = mongoose.model("Message",messageSchema)