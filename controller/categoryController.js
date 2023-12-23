const Category = require("../models/categoryModel");
const slugify = require("slugify");

// Create Category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(404).send({
        success: false,
        message: "Please Enter The Category Name",
      });
    }
    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return res.status(404).send({
        success: false,
        message: "Category Alraedy Exists",
      });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "Category Created Successfully",
      category,
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

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send({
      success: true,
      message: "All Categories Fetched",
      totalCategories: categories.length,
      categories,
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

// Update Category
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
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

// Get Single Category
const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single Category Fetched Successfully",
      category,
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

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: `${category} Category Deleted Successfully`,
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

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  getSingleCategory,
  deleteCategory,
};
