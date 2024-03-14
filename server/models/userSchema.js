const mongoose = require('mongoose')

const User = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    favourites: {
        type: Array,
        default: [],
    }
}, { timestamps: true })

module.exports = mongoose.model("user", User)
