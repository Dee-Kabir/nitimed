const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    isAdmin: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type:String,
        required: true
    },
    orderId: {
        type: String,
        default: ""
    },
    appointments: [
        {
            type: ObjectId,
            ref: "Appointment"
        }
    ],
    vaccinations: [
        {
            type: ObjectId,
            ref: "Vaccination"
        }
    ],
    inseminations: [
        {
            type: ObjectId,
            ref: "Insemination"
        }
    ],
    aadharNumber: {
        type:String
    }

},{timestamps: true})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
userSchema.set('toJSON',{
    virtuals: true
})


module.exports = mongoose.model('User',userSchema)