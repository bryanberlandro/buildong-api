import express from 'express';
import Product from '../models/productModel.js';
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/products.js';
import { storage } from '../config/cloudinaryConfig.js';
import multer from 'multer';
const prodRouter = express.Router();
const upload = multer({storage: storage})

prodRouter.get('/products', getAllProducts)
prodRouter.post('/products/upload', upload.array('photo', 3), addProduct)
prodRouter.get('/products/:prodId', getProduct)
prodRouter.get('/products/:productId/reviews', async (req, res) => {
    try {
        const { page, limit } = req.query;
        const selectedItem = await Product.findById(req.params.productId)
            .populate({
                path: 'reviews',
                options: {
                    skip: (page - 1) * limit,
                    limit: parseInt(limit)
                }
            });
        const totalReviews = await Product.findById(req.params.productId).populate('reviews').countDocuments();

        res.status(200).json({
            status: 200,
            message: "Successfully get "+selectedItem.reviews.length+ " reviews",
            totalPages: Math.ceil(totalReviews / limit),
            currentPage: page,
            data: selectedItem.reviews,
            method: req.params.method
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
prodRouter.get('/products/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.json({
            status: 200,
            total: products.length,
            message: "Successfully get related products",
            data: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
prodRouter.get('/products/material/:material', async (req, res) => {
    try {
        const { material } = req.params;
        const products = await Product.find({ material });
        res.json({
            status: 200,
            total: products.length,
            message: "Successfully get related products",
            data: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
prodRouter.patch('/products/:prodId', updateProduct)
prodRouter.delete('/products/:prodId', deleteProduct)

export default prodRouter;