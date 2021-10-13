const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const vaccineSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    nextVaccine: {
        type: ObjectId,
        ref: 'Vaccine'
    },
    uses: {
        type: String,
        default: ''
    },
    timeGapInDays : {
        type: Number
    },
    forBreed: {
        type:String,
        default: ""
    }
},{timestamps: true})


vaccineSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
vaccineSchema.set('toJSON',{
    virtuals: true
})

module.exports = mongoose.model("Vaccine",vaccineSchema)