const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const vaccineSchema = new mongoose.Schema({
    sNo: {
        type:Number
    },
    diseaseName: {
        type: String,
    },
    ageAtFirstDose: {
        type: String
    },
    uses: {
        type: String,
        default: ''
    },
    BoosterDose : {
        type: String
    },
    forBreed: {
        type:String,
        default: ""
    },
    subsequentDoseOrRemark: {
        type: String
    }
},{timestamps: true})


vaccineSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
vaccineSchema.set('toJSON',{
    virtuals: true
})

module.exports = mongoose.model("Vaccine",vaccineSchema)