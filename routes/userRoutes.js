const express = require("express");
const {
  register,
  loginUser,
  testController,
  getAllUsers,
  getMyOrders,
} = require("../controller/userController");
const { requireSignIn, isAdmin } = require("../middleware/authMidlleware");
const router = express.Router();

// register
router.post("/register", register);

// Login
router.post("/login", loginUser);

// Get All Users
router.get("/all-users",requireSignIn,isAdmin,getAllUsers);

// Dummy Route
router.get("/test", requireSignIn, isAdmin, testController);

// Protected Routes ==> user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});


// Protected Routes ==> Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// My Orders
router.get("/myOrders",requireSignIn,getMyOrders);

module.exports = router;
