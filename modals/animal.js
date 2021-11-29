const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    registrationId: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    breed: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: 'M'
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    vaccines: [
        {
            type: ObjectId,
            ref: 'RefModel'
        }
    ],
    semination: [
        {
            type:ObjectId,
            ref: 'RefModel'
        }
    ],
    remarks: [
        {
            type:String
        }
    ],
    uniqueNumber: {
        type : Number,
        required: true,
        unique: true
    }
},{timestamps: true})

animalSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
animalSchema.set('toJSON',{
    virtuals: true
})

module.exports = mongoose.model("Animal",animalSchema)