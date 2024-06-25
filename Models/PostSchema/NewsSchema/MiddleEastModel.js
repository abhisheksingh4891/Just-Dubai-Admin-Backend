const mongoose = require('mongoose');

const MiddleEastSchema = mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const MiddleEastModel = mongoose.model('MiddleEast', MiddleEastSchema);
module.exports = MiddleEastModel;
