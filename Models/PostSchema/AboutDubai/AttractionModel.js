const mongoose = require('mongoose');

const AttractionSchema = mongoose.Schema({
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

const AttractionModel = mongoose.model('Attraction', AttractionSchema);
module.exports = AttractionModel;
