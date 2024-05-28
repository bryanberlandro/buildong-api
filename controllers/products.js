import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        const productsData = {
            "products": products,
            "meta": {
                "total_products": products.length
            }
        }
        res.status(200).json(productsData);
    } catch(err){
        res.status(500).send({message: err.message});
    }
}

export const addProduct = async (req, res) => {
    const imageUrl = req.file.path
    try{
        const newProduct = new Product({image: imageUrl, ...req.body})
        const insertedProduct = await newProduct.save()
        res.status(200).json({message: 'Success add new product', status: 200, data: insertedProduct})
    } catch(err) {
        res.status(400).send({message: err.message});
    }
}

export const getProduct = async (req, res) => {
    try{
        const findProduct = await Product.findById(req.params.prodId);
        res.status(200).json(findProduct)
    } catch(err){
        res.status(400).send({message: err.message})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne({_id: req.params.prodId}, {$set: req.body})
        res.status(200).json(updatedProduct)
    } catch(err) {
        res.status(400).send({message: err.message});
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const deletedProduct = await Product.deleteOne({_id: req.params.prodId})
        res.status(200).json(deletedProduct)
    } catch(err) {
        res.status(400).send({message: err.message});
    }
}