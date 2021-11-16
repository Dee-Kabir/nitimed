const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const refModelSchema = new mongoose.Schema({
    onThis : {
        type: ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type:String,
        required: true,
        enum: ['Vaccine','Animal']
    },
    completed: {
        type: Boolean,
        default: false
    },
    byWhom: {
        type: ObjectId,
        ref: 'Doctor'
    }
},{timestamps: true})

refModelSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
refModelSchema.set('toJSON',{
    virtuals: true
})

module.exports = mongoose.model("RefModel",refModelSchema)