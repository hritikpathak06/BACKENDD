const express = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controller/productControlller");
const { requireSignIn, isAdmin } = require("../middleware/authMidlleware");
const router = express.Router();

// Create Product
router.post("/create-product",requireSignIn,isAdmin, createProduct);

// Get All Products
router.get("/all-products", getAllProducts);

module.exports = router;
