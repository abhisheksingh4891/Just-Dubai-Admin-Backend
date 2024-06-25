const express = require('express');
const router = express.Router();
const { upload, BuisnessPost, DubaiPost, EntertainmentPost, LegalPost, MiddleEastPost, SportsPost, WorldPost } = require('../../Controller/NewsController');

router.post('/buisnessnews', upload.single('image'), BuisnessPost); 
router.post('/dubainews', upload.single('image'), DubaiPost); 
router.post('/entertainmentnews', upload.single('image'), EntertainmentPost); 
router.post('/legalnews', upload.single('image'), LegalPost); 
router.post('/middleeastnews', upload.single('image'), MiddleEastPost); 
router.post('/sportsnews', upload.single('image'), SportsPost); 
router.post('/worldnews', upload.single('image'), WorldPost);

module.exports = router;
