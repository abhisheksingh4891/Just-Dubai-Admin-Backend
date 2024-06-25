const multer = require('multer');
const path = require('path');
const MiddleEastModel = require("../Models/PostSchema/NewsSchema/MiddleEastModel")
const EntertainmentModel = require("../Models/PostSchema/NewsSchema/EntertainmentModel")
const DubaiModel = require("../Models/PostSchema/NewsSchema/DubaiModel")
const WorldModel = require("../Models/PostSchema/NewsSchema/WorldModel")
const BuisnessModel = require("../Models/PostSchema/NewsSchema/BuisnessModel")
const LegalModel = require("../Models/PostSchema/NewsSchema/LegalModel")
const SportsModel = require("../Models/PostSchema/NewsSchema/SportsModel")

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


exports.MiddleEastPost = async (req, res) => {
    try {
      const { heading, content, uploadedBy } = req.body;
  
      // const postExists = await FestivalModel.findOne({ heading });
      // if (postExists) {
      //   return res.status(403).json({ message: 'Post Already Exists' });
      // }
  
      const image = req.file ? `/uploads/${req.file.filename}` : null; 
  
      const post = await MiddleEastModel.create({
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

  exports.EntertainmentPost = async (req, res) => {
    try {
      const { heading, content, uploadedBy } = req.body;
  
      // const postExists = await FestivalModel.findOne({ heading });
      // if (postExists) {
      //   return res.status(403).json({ message: 'Post Already Exists' });
      // }
  
      const image = req.file ? `/uploads/${req.file.filename}` : null; 
  
      const post = await EntertainmentModel.create({
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

  exports.DubaiPost = async (req, res) => {
    try {
      const { heading, content, uploadedBy } = req.body;
  
      // const postExists = await FestivalModel.findOne({ heading });
      // if (postExists) {
      //   return res.status(403).json({ message: 'Post Already Exists' });
      // }
  
      const image = req.file ? `/uploads/${req.file.filename}` : null; 
  
      const post = await DubaiModel.create({
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

  exports.WorldPost = async (req, res) => {
    try {
      const { heading, content, uploadedBy } = req.body;
  
      // const postExists = await FestivalModel.findOne({ heading });
      // if (postExists) {
      //   return res.status(403).json({ message: 'Post Already Exists' });
      // }
  
      const image = req.file ? `/uploads/${req.file.filename}` : null; 
  
      const post = await WorldModel.create({
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

  exports.BuisnessPost = async (req, res) => {
    try {
      const { heading, content, uploadedBy } = req.body;
  
      // const postExists = await FestivalModel.findOne({ heading });
      // if (postExists) {
      //   return res.status(403).json({ message: 'Post Already Exists' });
      // }
  
      const image = req.file ? `/uploads/${req.file.filename}` : null; 
  
      const post = await BuisnessModel.create({
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

  exports.LegalPost = async (req, res) => {
    try {
      const { heading, content, uploadedBy } = req.body;
  
      // const postExists = await FestivalModel.findOne({ heading });
      // if (postExists) {
      //   return res.status(403).json({ message: 'Post Already Exists' });
      // }
  
      const image = req.file ? `/uploads/${req.file.filename}` : null; 
  
      const post = await LegalModel.create({
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

  exports.SportsPost = async (req, res) => {
    try {
      const { heading, content, uploadedBy } = req.body;
  
      // const postExists = await FestivalModel.findOne({ heading });
      // if (postExists) {
      //   return res.status(403).json({ message: 'Post Already Exists' });
      // }
  
      const image = req.file ? `/uploads/${req.file.filename}` : null; 
  
      const post = await SportsModel.create({
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