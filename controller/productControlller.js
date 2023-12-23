const Product = require("../models/productModel");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "drbzzh6j7",
  api_key: "776943229854165",
  api_secret: "RWZatGE-U7hTRE0Re8XM8JnVv84",
});

// Create Product
const createProduct = async (req, res) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    // req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      user:req.user.id,
      product,
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


// Get All Products
const getAllProducts = async(req,res) => {
  try {
    const products = await Product.find({}).sort({createdAt:-1});
    res.status(200).send({
      success:true,
      message:"All Prodcuts Fetched Successfully",
      productCount:products.length,
      products
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error!!",
      error,
    });
  }
}

module.exports = { createProduct,getAllProducts };
