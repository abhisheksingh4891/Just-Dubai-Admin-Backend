const FestivalModel = require('../Models/PostSchema/AboutDubai/FestivalModel');
const CultureModel = require('../Models/PostSchema/AboutDubai/CultureModel');
const InterestingFactModel = require('../Models/PostSchema/AboutDubai/InterestingFactModel');
const AttractionModel = require('../Models/PostSchema/AboutDubai/AttractionModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });
exports.upload = upload;

exports.FestivalPost = async (req, res) => {
  try {
    const { heading, content, uploadedBy } = req.body;

    // const postExists = await FestivalModel.findOne({ heading });
    // if (postExists) {
    //   return res.status(403).json({ message: 'Post Already Exists' });
    // }

    const image = req.file ? `/uploads/${req.file.filename}` : null; 

    const post = await FestivalModel.create({
      heading,
      content,
      uploadedBy,
      image 
    });

    res.status(201).json({ message: 'Post Upload Successfull' });
  } catch (err) {
    res.status(500).json({ message: 'Post Upload Failed' });
    console.log(err);
  }
};


exports.AttractionPost = async (req, res) => {
  try {
    const { heading, content, uploadedBy } = req.body;

    // const postExists = await FestivalModel.findOne({ heading });
    // if (postExists) {
    //   return res.status(403).json({ message: 'Post Already Exists' });
    // }

    const image = req.file ? `/uploads/${req.file.filename}` : null; 

    const post = await AttractionModel.create({
      heading,
      content,
      uploadedBy,
      image 
    });

    res.status(201).json({ message: 'Post Upload Successfull' });
  } catch (err) {
    res.status(500).json({ message: 'Post Upload Failed' });
    console.log(err);
  }
};



exports.CulturePost = async (req, res) => {
  try {
    const { heading, content, uploadedBy } = req.body;

    // const postExists = await FestivalModel.findOne({ heading });
    // if (postExists) {
    //   return res.status(403).json({ message: 'Post Already Exists' });
    // }

    const image = req.file ? `/uploads/${req.file.filename}` : null; 

    const post = await CultureModel.create({
      heading,
      content,
      uploadedBy,
      image 
    });

    res.status(201).json({ message: 'Post Upload Successfull' });
  } catch (err) {
    res.status(500).json({ message: 'Post Upload Failed' });
    console.log(err);
  }
};


exports.InterestingFactsPost = async (req, res) => {
  try {
    const { heading, content, uploadedBy } = req.body;

    // const postExists = await FestivalModel.findOne({ heading });
    // if (postExists) {
    //   return res.status(403).json({ message: 'Post Already Exists' });
    // }

    const image = req.file ? `/uploads/${req.file.filename}` : null; 

    const post = await InterestingFactModel.create({
      heading,
      content,
      uploadedBy,
      image 
    });

    res.status(201).json({ message: 'Post Upload Successfull' });
  } catch (err) {
    res.status(500).json({ message: 'Post Upload Failed' });
    console.log(err);
  }
};


