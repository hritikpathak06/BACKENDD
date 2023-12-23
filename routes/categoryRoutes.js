const express = require("express");
const { requireSignIn, isAdmin } = require("../middleware/authMidlleware");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  getSingleCategory,
  deleteCategory,
} = require("../controller/categoryController");
const router = express();

// Create Category
router.post("/create-category", requireSignIn, isAdmin, createCategory);

// Get All Categories
router.get("/get-categories", getAllCategories);

// Update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);

// Get Single Category
router.get("/single-category/:slug", getSingleCategory);

// Delete Category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

module.exports = router;
