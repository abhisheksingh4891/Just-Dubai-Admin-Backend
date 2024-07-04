const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const AdminModel = require("../Models/AdminModel");
const DummyUserModel = require("../Models/DummyUserModel");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
exports.upload = upload;

// registeration controller
exports.adminRegister = async (req, res) => {
  try {
    const {
      first,
      last,
      email,
      password,
      phone,
      designation,
      empId,
      dateOfBirth,
      superAdmin,
    } = req.body;

    const requiredFields = {
      first: "First name is required",
      last: "Last name is required",
      email: "Email is required",
      password: "Password is required",
      phone: "Phone number is required",
      dateOfBirth: "Date of birth is required",
      designation: "Designation is required",
      empId: "Employee ID is required",
    };

    for (const [field, message] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        return res.status(400).json({ message });
      }
    }

    const userExists = await AdminModel.findOne({ email, empId });
    if (userExists) {
      return res.status(403).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (image === null) {
      return res.status(400).json({ message: "Upload your image" });
    }

    const user = await AdminModel.create({
      first,
      last,
      email,
      phone,
      designation,
      empId,
      dateOfBirth,
      password: hashedPassword,
      image,
      superAdmin,
    });

    res.status(201).json({ message: "Registration Successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration Failed" });
    console.log(err);
  }
};

// login controller
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Enter your email" });
    }

    if (!password) {
      return res.status(400).json({ message: "Enter your password" });
    }

    const user = await AdminModel.findOne({ email });
    if (!user) {
      const dummyUser = await DummyUserModel.findOne({ email, password });
      if (dummyUser) {
        dummyUser.loginAttempts += 1;
        await dummyUser.save();
      } else {
        const dummyNewUser = new DummyUserModel({
          email,
          password,
        });
        await dummyNewUser.save();
      }
      return res.status(404).json({ message: "User not found" });
    }

    const currentTime = new Date();
    const istTime = new Date(currentTime.getTime() + 5.5 * 60 * 60 * 1000);

    if (user && user.disabledUntil && user.disabledUntil > istTime) {
      return res
        .status(403)
        .json({
          message: `Login disabled. Try again after ${Math.round(
            (user.disabledUntil - istTime) / (60 * 1000)
          )} minutes.`,
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      user.loginAttempts += 1;
      await user.save();

      if (user.loginAttempts >= 3) {
        user.loginAttempts = 0;
        user.disabledUntil = new Date(istTime.getTime() + 30 * 60 * 1000);
        await user.save();
        return res
          .status(403)
          .json({ message: `Login disabled. Try again after 30 minutes` });
      }
      return res.status(404).json({ message: "Wrong password" });
    }

    user.loginAttempts = 1;
    await user.save();

    const token = jwt.sign({ userId: user._id }, "your_secret_key");
    return res
      .status(201)
      .json({
        message: "Login successful",
        token,
        superAdmin: user.superAdmin,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

// sending using nodemailer forgot password
exports.sendMail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${user._id}/${token}`;

    const htmlContent = `
    <!doctype html>
    <html lang="en-US">

    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password Email Template</title>
        <meta name="description" content="Reset Password Email Template.">
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
    </head>

    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                requested to reset your password</h1>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                You are receiving this because you (or someone else) have requested the reset of the password for your account. A unique link to reset your
                                                password has been generated for you. To reset your password, click the
                                                following link and follow the instructions.
                                            </p>
                                            <a href="${resetUrl}"
                                                style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                Password</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>Just-Dubai</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>

    </html>
    `;

    const mailOptions = {
      to: user.email,
      from: `"Abhishek Singh" <${process.env.USER}>`,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${resetUrl}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error("There was an error: ", err);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        res.status(200).json("Recovery email sent");
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// password reset controller
exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  try {
    const user = await AdminModel.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return res.status(404).json({ message: "Try new password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// fetching all user data in remove user page
exports.adminData = async (req, res) => {
  try {
    const allData = await AdminModel.find({});
    res.status(201).json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// deleting user from remove user page
exports.userDelete = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await AdminModel.findByIdAndUpdate(
      userId,
      { active: false },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update user data from remove user page
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
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// user profile authorization
exports.adminProfile = async (req, res) => {
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

    const formattedUser = {
      ...user._doc,
      dateOfBirth: user.dateOfBirth.toISOString().split("T")[0],
    };

    res.json(formattedUser);
  } catch (err) {
    console.error("Token validation error", err);
    res.status(401).send({ message: "Invalid token" });
  }
};

// user profile update
exports.adminUpdateProfile = async (req, res) => {
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

    const { first, last, email, phone, designation, dateOfBirth, password } =
      req.body;

    let emailChanged = false;
    if (email && email !== user.email) {
      emailChanged = true;
    }

    user.first = first || user.first;
    user.last = last || user.last;
    user.phone = phone || user.phone;
    user.designation = designation || user.designation;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (emailChanged) {
      const token = jwt.sign(
        { userId: user._id, newEmail: email },
        "your_secret_key",
        { expiresIn: "1h" }
      );
      user.emailResetToken = token;
      user.emailResetExpires = Date.now() + 3600000;
      await user.save();

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        to: email,
        from: `"Abhishek Singh" <${process.env.USER}>`,
        subject: "Email Reset",
        text:
          `You are receiving this because you (or someone else) have requested to reset your email address for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `http://localhost:3000/reset-email/${token}\n\n` +
          `If you did not request this, please ignore this email and your email address will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "Email reset link sent" });
    }

    await user.save();

    res.json({
      message: "Profile update successful",
      _id: user._id,
      first: user.first,
      last: user.last,
      email: user.email,
      phone: user.phone,
      designation: user.designation,
      dateOfBirth: user.dateOfBirth,
    });
  } catch (err) {
    console.error("Token validation error", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

// to reset email using the email reset token
exports.resetEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, "your_secret_key");
    const userId = decoded.userId;

    let user = await AdminModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.emailResetToken !== req.params.token ||
      user.emailResetExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.email = decoded.newEmail;
    user.emailResetToken = undefined;
    user.emailResetExpires = undefined;
    await user.save();

    res.json({ message: "Email reset successful" });
  } catch (err) {
    console.error("Error resetting email", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
