const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        min: 6,
        max: 255,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        min: 6,
        max: 255,
        unique: true,
        primary: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: 8,
        max: 1024,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.models.users || mongoose.model('users', userSchema);


