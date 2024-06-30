import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
    try {
        const { category, brand, material, price_from, price_to } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }
        if (brand) {
            query.brand = brand; 
        }
        if (material) {
            query.material = material; 
        }
        if (price_from || price_to) {
            query.unit_price = {};
            if (price_from) {
                query.unit_price.$gte = parseFloat(price_from); 
            }
            if (price_to) {
                query.unit_price.$lte = parseFloat(price_to); 
            }
        }

        const products = await Product.find(query);
        if(products.length > 0){
            res.status(200).json({
                msg: "Successfully get all data",
                status: "200",
                data_length: products.length,
                data: products,
                method: req.method
            })
        } else {
            res.status(200).json({
                msg: "No data found",
                status: "200",
                data_length: products.length,
                method: req.method
            })
        }
    } catch(err){
        res.status(500).send({message: err.message});
    }
}

export const addProduct = async (req, res) => {
    console.log(req.files)
    try{
        const files = req.files;
        if (!files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        const photoUrls = files.map(file => file.path); 

        const newProduct = new Product({image: photoUrls, ...req.body})
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