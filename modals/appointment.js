const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const appointmentSchema = new mongoose.Schema({
    amount: {
        type:Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    },
    doctor: {
        type: ObjectId,
        ref: 'Doctor'
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    animal: {
        type: ObjectId,
        ref: 'Animal'
    },
    messages: [
        {type: ObjectId,
        ref: 'Message'}
    ],
    order_id: {
        type:String
    },
    payment_id: {
        type:String
    },
    razorpay_signature: {
        type:String
    }

},{timestamps: true})

appointmentSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
appointmentSchema.set('toJSON',{
    virtuals: true
})

module.exports = mongoose.model("Appointment",appointmentSchema)