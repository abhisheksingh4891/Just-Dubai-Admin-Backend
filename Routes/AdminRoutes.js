const express = require('express');
const router = express.Router();
const {resetpassword, sendmail, userDataUpdate, AdminDataUpdate, AdminData, AdminRegister, AdminLogin, AdminProfile, AdminUpdateProfile, upload } = require('../Controller/AdminController');
// const {CheckDisable} = require("../Middleware/CheckDisable")

router.post('/login', AdminLogin);
router.post('/register', upload.single('image'), AdminRegister); 
router.get('/profile', AdminProfile);
router.put('/profile/update', AdminUpdateProfile);
router.get('/user/data', AdminData);
router.put('/user/deactivate/:userId',AdminDataUpdate);
router.put('/user/update/:userId', userDataUpdate);
router.post('/users/forgotpassword', sendmail);
router.put('/users/reset-password/:id/:token', resetpassword);

module.exports = router;
