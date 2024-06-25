const mongoose = require('mongoose');

const InterestingFactSchema = mongoose.Schema({
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

const InterestingFactModel = mongoose.model('InterestingFact', InterestingFactSchema);
module.exports = InterestingFactModel;
