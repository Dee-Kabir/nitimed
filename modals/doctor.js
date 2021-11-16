const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Number,
        default: 1
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type:String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    fee: {
        type:Number,
        default: 0
    },
    jobType: {
        type: String,
        default: 'private'
    },
    photo: {
        type:String,
        default: ''
    },
    proof: {
        type:String,
        default: ''
    },
    qualification: {
        type:String
    },
    roomId: {
        type:String
    },
    servingType: {
        type:String,
        default: 'serving'
    },
    speciality: {
        type:String
    },
    weekdays: [
        {
            type:String
        }
    ],
    workTime: {
        type:String,
        default: 'fullTime'
    },
    registrationNumber:{
        type: String,
        // required: true,
        // unique: true
    },
    aadharNumber:{
        type:String,
        // required: true,
        // unique: true
    },
    appointments: 
        {
            completedAppointments : [
                {
                    type: ObjectId,
                    ref: "Appointment"
                }
            ],
            pendingAppointments: [
                {
                    type: ObjectId,
                    ref: "Appointment"
                }
            ]
        },
    inseminations: 
    {
        completedInseminations : [
            {
                type: ObjectId,
                ref: "Insemination"
            }
        ],
        pendingInseminations: [
            {
                type: ObjectId,
                ref: "Insemination"
            }
        ]
    },
    vaccinations: 
    {
        completedVaccinations : [
            {
                type: ObjectId,
                ref: "Vaccination"
            }
        ],
        pendingVaccinations : [
            {
                type: ObjectId,
                ref: "Vaccination"
            }
        ]
    },
    hospital : {
        type: ObjectId,
        ref : "Hospital"
    },
    timing: {
        type: String
    }

},{timestamps: true})

doctorSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
doctorSchema.set('toJSON',{
    virtuals: true
})


module.exports = mongoose.model('Doctor',doctorSchema)