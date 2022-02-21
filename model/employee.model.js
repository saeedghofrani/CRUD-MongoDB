const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName required'],
        minlength: [2, 'invalid input'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'lastName required'],
        trim: true
    },
    nationalCode: {
        type: String,
        unique: true,
        required: [true, 'nationalCode required'],
        trim: true
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'none'],
            message: '{VALUE} is not supported'
        },
        default: 'none',
        trim: true
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} is not supported'
        },
        default: 'user',
        trim: true
    },
    dateOfBirth: {
        type: Date,
    },
    company: {
        type: String,
        ref: "Company",
        required: true
    }
}, { timestamps: true });
UserSchema.plugin(uniqueValidator, { message: 'this is already taken.' });
module.exports = mongoose.model('Employee', UserSchema);