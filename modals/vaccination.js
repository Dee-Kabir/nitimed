const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const vaccinationSchema = new mongoose.Schema({
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
    order_id: {
        type:String
    },
    payment_id: {
        type:String
    },
    razorpay_signature: {
        type:String
    },
    messages: [
        {type: ObjectId,
        ref: 'Message'}
    ]

},{timestamps: true})

vaccinationSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
vaccinationSchema.set('toJSON',{
    virtuals: true
})

module.exports = mongoose.model("Vaccination",vaccinationSchema)