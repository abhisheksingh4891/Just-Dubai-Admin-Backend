const mongoose = require('mongoose');

const DubaiSchema = mongoose.Schema({
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

const DubaiModel = mongoose.model('Dubai', DubaiSchema);
module.exports = DubaiModel;
