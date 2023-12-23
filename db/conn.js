const mongoose = require("mongoose");

const connectDB = async() => {
    try {
       const connection = await mongoose.connect("mongodb+srv://phritik06:zfXJ65SNiZoXhayt@eccom.zqrt7ny.mongodb.net/Shopify?retryWrites=true&w=majority");
       console.log("Databse Connected Successfully".bgCyan);
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;