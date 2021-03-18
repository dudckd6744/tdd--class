const Product = require("../models/Product");

exports.createProduct = (req,res)=>{
    Product.create();
}

