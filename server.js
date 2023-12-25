const express = require("express");
const app = express();
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./db/conn");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

// DB
connectDB();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:7000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// middlewares😀
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(fileUpload());

// Increase the payload size limit (adjust the limit as needed)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Routes
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

// Routes Api
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// port
const PORT = process.env.PORT || 7000;

// Test api
app.get("/", (req, res) => {
  res.send("Hello Backend User==> Payment Gateway Added");
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server Is Running Successfully:${PORT}`.bgGreen);
});
