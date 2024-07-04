const mongoose = require("mongoose");

const DummyUserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  }
});

const DummyUserModel = mongoose.model("DummyUser", DummyUserSchema);
module.exports = DummyUserModel;
