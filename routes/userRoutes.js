const express = require("express");
const { register, loginUser, testController } = require("../controller/userController");
const { requireSignIn, isAdmin } = require("../middleware/authMidlleware");
const router = express.Router();

// register
router.post("/register",register)

// Login
router.post("/login",loginUser)

// Dummy Route
router.get("/test",requireSignIn,isAdmin,testController)


module.exports = router;