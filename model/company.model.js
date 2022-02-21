const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new Schema({
    Cname: {
        type: String,
        unique: true,
        required: [true, 'name required'],
        minlength: [2, 'invalid input'],
        index: true,
        trim: true
    },
    registrationNumber: {
        type: String,
        required: [true, 'registrationNumber required'],
        unique: true,
        trim: true
    },
    city: {
        type: String,
        required: [true, 'city required'],
        trim: true
    },
    province: {
        type: String,
        required: [true, 'province required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    phoneNumber: {
        type: Number,
        unique: true,
    }
}, { timestamps: true });
UserSchema.plugin(uniqueValidator, { message: 'this is already taken.' });
module.exports = mongoose.model('Company', UserSchema);