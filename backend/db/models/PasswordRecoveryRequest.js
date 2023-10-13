const mongoose = require('mongoose');

const PasswordRecoveryRequestModel = new mongoose.Schema({
    code: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24, // 24 hours in seconds
    }
});

module.exports = mongoose.model('passwordRecoveryRequest', PasswordRecoveryRequestModel);