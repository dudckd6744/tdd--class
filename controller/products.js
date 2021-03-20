const Product = require("../models/Product");

exports.createProduct = async (req,res,next)=>{
    try {
        const createdProduct = await Product.create(req.body);
    console.log(createdProduct)
    res.status(201).json(createdProduct);

    } catch (error) {
        next(error)
    }
    
}

exports.getProducts = async (req,res,next)=>{
    try {
        const allProducts =  await Product.find({});
        res.status(200).json(allProducts)
    } catch (error) {
        next(error)
    }
}

exports.getProductById =async (req,res,next)=>{
    try {
        const product = await Product.findById(req.params.productId)
            if(product){
                res.status(200).json(product);
            }else{
                res.status(404).send();
            }
    } catch (error) {
        next(error)
    }
}

exports.updateProduct = async (req,res,next)=>{

    try {
        const updatedPRoduct =  await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            {new:true}
        )
            if(updatedPRoduct){
                res.status(200).json(updatedPRoduct)
            }else{
                res.status(404).send();
            }
    } catch (error) {
        next(error)
    }
    
    }
