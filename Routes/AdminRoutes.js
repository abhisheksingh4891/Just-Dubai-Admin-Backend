const express = require('express');
const router = express.Router();
const {userDataUpdate, AdminDataUpdate, AdminData, AdminRegister, AdminLogin, AdminProfile, AdminUpdateProfile, upload } = require('../Controller/AdminController');

router.post('/login', AdminLogin);
router.post('/register', upload.single('image'), AdminRegister); 
router.get('/profile', AdminProfile);
router.put('/profile/update', AdminUpdateProfile);
router.get('/user/data', AdminData);
router.put('/user/deactivate/:userId',AdminDataUpdate);
router.put('/user/update/:userId', userDataUpdate)

module.exports = router;
