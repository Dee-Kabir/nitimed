const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Number,
        default: 2
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type:String,
        required: true
    },
    city: {
        type:String,
        required: true
    },
    hospitalRegistration: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    doctors : [
        {
            type : ObjectId,
            ref: 'Doctor'
        }
    ],
    resetPasswordToken : {
        type:String
    },
    resetPasswordExpires : {
        type:Date
    }
},{timestamps: true})

hospitalSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
hospitalSchema.set('toJSON',{
    virtuals: true
})

module.exports = mongoose.model('Hospital',hospitalSchema);