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
prodRouter.get('/:productId/reviews', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('reviews');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            status: 200,
            message: "Successfully get "+product.reviews.length+" reviews",
            data: product.reviews,
            method: req.params.method
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
prodRouter.patch('/products/:prodId', updateProduct)
prodRouter.delete('/products/:prodId', deleteProduct)

export default prodRouter;