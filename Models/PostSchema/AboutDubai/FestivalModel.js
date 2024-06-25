const mongoose = require('mongoose');

const FestivalSchema = mongoose.Schema({
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

const FestivalModel = mongoose.model('Festival', FestivalSchema);
module.exports = FestivalModel;
