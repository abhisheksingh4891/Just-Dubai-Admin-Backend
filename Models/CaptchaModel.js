const mongoose = require('mongoose');

const captchaSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m', // Captcha expires in 10 minutes
  },
});

const CaptchaModel = mongoose.model('Captcha', captchaSchema);

module.exports = CaptchaModel;
