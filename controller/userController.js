const {
  hashPassword,
  comparePassword,
} = require("../middleware/hadhMddleware");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const JWT = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

//******************************************** */ Cloudinary Config **********************************
cloudinary.config({
  cloud_name: "drbzzh6j7",
  api_key: "776943229854165",
  api_secret: "RWZatGE-U7hTRE0Re8XM8JnVv84",
});

// Register User
const register = async (req, res) => {
  try {
    const { name, email, phone, password, address, avatar } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.status(204).send({
        success: false,
        message: "Fill Out All The fields",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(avatar, {
      folder: "profile_images",
    });

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      avatar: result.secure_url,
    });
    const user = await newUser.save();
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error!!",
      error,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(204).send({
        success: false,
        message: "Inavlid email or password",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const matchedPassword = await comparePassword(password, user.password);
    if (!matchedPassword) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // token
    const token = await JWT.sign(
      { _id: user._id },
      "ABCDEFGFHIUTTRTFAYAHGAHGYGUAHUAIAUAHUAAKOA",
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      message: "User Logged In successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error!!",
      error,
    });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      message: "All Users Fetched Successfully",
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error!!",
      error,
    });
  }
};

// Get Orders Of User
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products")
      .populate("buyer");
    res.status(200).send({
      success: true,
      message: "Order Details Fetched Successfully",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error!!",
      error,
    });
  }
};


// test
const testController = async (req, res) => {
  res.send("Test Api Running Successfully");
};

module.exports = {
  register,
  loginUser,
  testController,
  getAllUsers,
  getMyOrders,
};
