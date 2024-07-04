const express = require('express');
const router = express.Router();
const {resetPassword, sendMail, userDataUpdate, adminData, adminRegister, adminLogin, adminProfile, adminUpdateProfile, upload, userDelete, resetEmail } = require('../Controller/AdminController');
// const {CheckDisable} = require("../Middleware/CheckDisable")

// router.get('/captcha', getCaptcha);
router.post('/login', adminLogin);
router.post('/register', upload.single('image'), adminRegister); 
router.get('/profile', adminProfile);
router.put('/profile/update', adminUpdateProfile);
router.get('/user/data', adminData);
router.put('/user/deactivate/:userId', userDelete);
router.put('/user/update/:userId', userDataUpdate);
router.post('/users/forgotpassword', sendMail);
router.put('/users/reset-password/:id/:token', resetPassword);
router.put('/users/reset-email/:token', resetEmail);

module.exports = router;
