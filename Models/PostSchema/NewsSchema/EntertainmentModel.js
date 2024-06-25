const mongoose = require('mongoose');

const EntertainmentSchema = mongoose.Schema({
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

const EntertainmentModel = mongoose.model('Entertainment', EntertainmentSchema);
module.exports = EntertainmentModel;
