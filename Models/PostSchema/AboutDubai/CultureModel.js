const mongoose = require('mongoose');

const CultureSchema = mongoose.Schema({
    heading:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    uploadedBy:{
        type: String,
        required: true,
    },
    image: {
        type: String 
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const CultureModel = mongoose.model('Culture', CultureSchema);
module.exports = CultureModel;
