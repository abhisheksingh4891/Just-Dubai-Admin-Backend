const mongoose = require('mongoose');

const SiteInformationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    policy: {
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
    favicon: {
        type: String
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const SiteDataModel = mongoose.model('Site Information', SiteInformationSchema);
module.exports = SiteDataModel;
