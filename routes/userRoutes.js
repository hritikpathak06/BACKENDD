const express = require("express");
const {
  register,
  loginUser,
  testController,
} = require("../controller/userController");
const { requireSignIn, isAdmin } = require("../middleware/authMidlleware");
const router = express.Router();

// register
router.post("/register", register);

// Login
router.post("/login", loginUser);

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

module.exports = router;
