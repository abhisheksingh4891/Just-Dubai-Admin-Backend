const AdminModel = require("../Models/AdminModel");

const checkDisable = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await AdminModel.findOne({ email });

    const currentTime = new Date();
    const istTime = new Date(currentTime.getTime() + 5.5 * 60 * 60 * 1000); // IST offset
    // user.disabledUntil = new Date(istTime.getTime() + 30 * 60 * 1000);

    if (user && user.disabledUntil && user.disabledUntil > istTime ) {
      return res
        .status(403)
        .json({ message: "Login disabled. Try again after 30 minutes." });
    }

    req.user = user; // Attach user object to request for later use
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error checking disable status" });
  }
};
module.exports = checkDisable;
