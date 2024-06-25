const mongoose = require('mongoose');

const BuisnessSchema = mongoose.Schema({
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

const BuisnessModel = mongoose.model('Buisness', BuisnessSchema);
module.exports = BuisnessModel;
