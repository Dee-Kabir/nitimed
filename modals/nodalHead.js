const mongoose = require('mongoose')

const nodalHeadSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    state: {
        type: String,
    },
    designation: {
        type: String,
    },
    landline: {
        type: String,
    }

},{timestamps: true})

nodalHeadSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
nodalHeadSchema.set('toJSON',{
    virtuals: true
})


module.exports = mongoose.model('NodalHead',nodalHeadSchema)