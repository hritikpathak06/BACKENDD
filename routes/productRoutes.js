const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  paymentGatewayToken,
  paymentGateway,
  productFilter,
} = require("../controller/productControlller");
const { requireSignIn, isAdmin } = require("../middleware/authMidlleware");
const router = express.Router();

// Create Product
router.post("/create-product",requireSignIn,isAdmin, createProduct);

// Get All Products
router.get("/all-products", getAllProducts);

// Get Single Product
router.get("/single-product/:id",getSingleProduct);

// update product
router.put("/update-product/:id",requireSignIn,isAdmin,updateProduct);

// delete product
router.delete("/delete-product/:id",requireSignIn,isAdmin,deleteProduct);

// Filters
router.post("/product-filter",productFilter)


// Payment Routes
router.get("/braintree/token",paymentGatewayToken);
router.post("/braintree/payment",requireSignIn,paymentGateway)

module.exports = router;
