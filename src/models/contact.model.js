const mongoose = require('mongoose')

// Contact Schema
const contactSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
            lowercase: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Contact', contactSchema)
