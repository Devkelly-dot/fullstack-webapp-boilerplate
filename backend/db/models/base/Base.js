const mongoose = require('mongoose');

const BaseModel = new mongoose.Schema({
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    }
});


module.exports = BaseModel;