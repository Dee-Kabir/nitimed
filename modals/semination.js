const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const seminationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    whose: {
        type: ObjectId,
        ref: 'Animal'
    },
    timeGapInDays : {
        type: Number
    }
},{timestamps: true})


seminationSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
seminationSchema.set('toJSON',{
    virtuals: true
})

module.exports = mongoose.model("Semination",seminationSchema)