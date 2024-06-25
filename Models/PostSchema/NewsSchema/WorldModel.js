const mongoose = require('mongoose');

const WorldSchema = mongoose.Schema({
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

const WorldModel = mongoose.model('World', WorldSchema);
module.exports = WorldModel;
