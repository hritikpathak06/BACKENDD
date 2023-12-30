const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

// Protected Routes
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      "ABCDEFGFHIUTTRTFAYAHGAHGYGUAHUAIAUAHUAAKOA"
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Please login to continue the process",
    });
  }
};


// Admin Protected Route
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unathorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = { requireSignIn, isAdmin };
