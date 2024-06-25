const express = require('express');
const router = express.Router();
const { FestivalPost, upload, CulturePost, AttractionPost, InterestingFactsPost } = require('../../Controller/AboutDubaiController');

router.post('/festival', upload.single('image'), FestivalPost); 
router.post('/culture', upload.single('image'), CulturePost); 
router.post('/interestingFact', upload.single('image'), InterestingFactsPost); 
router.post('/attraction', upload.single('image'), AttractionPost); 

module.exports = router;
