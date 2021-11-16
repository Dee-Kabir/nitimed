const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const seminationSchema = new mongoose.Schema({
    whose: {
        type: ObjectId,
        ref: 'Animal'
    }
},{timestamps: true})


seminationSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
seminationSchema.set('toJSON',{
    virtuals: true
})

module.exports = mongoose.model("Semination",seminationSchema)