const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String
    },
    isAdmin: {
        type: Number,
        default: 3
    }
},{timestamps: true})

adminSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
adminSchema.set('toJSON',{
    virtuals: true
})

module.exports = mongoose.model("Admin",adminSchema)