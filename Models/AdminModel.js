const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  empId: {
    type: Number,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
  superAdmin: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  loginAttempts: {
    type: Number,
    default: 0,
  },
  disabledUntil: Date,
});

const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
