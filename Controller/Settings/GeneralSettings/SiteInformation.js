const SiteDataModel = require("../../../Models/Settings/GeneralSettings/SiteDatamodel");
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
exports.upload = upload.fields([
  { name: "favicon", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

exports.SiteInformation = async (req, res) => {
  try {
    const { title, policy, uploadedBy } = req.body;
    const favicon = req.files["favicon"]
      ? `/uploads/${req.files["favicon"][0].filename}`
      : null;
    const image = req.files["image"]
      ? `/uploads/${req.files["image"][0].filename}`
      : null;

    const siteData = await SiteDataModel.findOne({});
    if (siteData) {
      siteData.title = title;
      siteData.policy = policy;
      siteData.uploadedBy = uploadedBy;
      if (favicon) siteData.favicon = favicon;
      if (image) siteData.image = image;

      await siteData.save();
      res.status(200).json({ message: "Post Update Successful" });
    } else {
      siteData = new SiteDataModel({
        title,
        policy,
        uploadedBy,
        favicon,
        image,
      });
      await siteData.save();
      res.status(201).json({ message: "Post Upload Successful" });
    }
  } catch (err) {
    res.status(500).json({ message: "Post Upload Failed" });
    console.log(err);
  }
};

exports.SiteData = async (req, res) => {
  try {
    const allData = await SiteDataModel.find({});
    res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
