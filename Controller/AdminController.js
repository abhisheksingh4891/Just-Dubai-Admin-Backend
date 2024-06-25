const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminModel = require("../Models/AdminModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.AdminRegister = async (req, res) => {
  try {
    const { first, last, email, password, phone, designation, empId } = req.body;

    const userExists = await AdminModel.findOne({ email, empId });
    if (userExists) {
      return res.status(403).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const image = req.file ? `/uploads/${req.file.filename}` : null; 

    const user = await AdminModel.create({
      first,
      last,
      email,
      phone,
      designation,
      empId,
      password: hashedPassword,
      image, 
    });

    res.status(201).json({ message: "Registration Successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration Failed" });
    console.log(err);
  }
};

exports.upload = upload;

exports.AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ userId: user._id }, "your_secret_key");
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.AdminData = async (req, res) => {
  try {
    const allData = await AdminModel.find({});
    res.json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.AdminDataUpdate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await AdminModel.findByIdAndUpdate(
      userId,
      { active: false },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.userDataUpdate = async (req, res) => {
  const userId = req.params.userId;
  const { first, last, phone, email, designation } = req.body;  
  
  try {
    const updatedUser = await AdminModel.findByIdAndUpdate(
      userId,
      { first, last, phone, email, designation },
      { new: true } 
    );
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.AdminProfile = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    const user = await AdminModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Token validation error", err);
    res.status(401).send({ message: "Invalid token" });
  }
};


exports.AdminUpdateProfile = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    const userId = decoded.userId;

    let user = await AdminModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { first, last, email, phone, designation } = req.body;
    user.first = first || user.first;
    user.last = last || user.last;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.designation = designation || user.designation;

    await user.save();

    res.json({
      _id: user._id,
      first: user.first,
      last: user.last,
      email: user.email,
      phone: user.phone,
      designation: user.designation,
    });
  } catch (err) {
    console.error("Token validation error", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
