import express from 'express';
import Product from '../models/productModel.js';
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/products.js';
import { storage } from '../config/cloudinaryConfig.js';
import multer from 'multer';
const prodRouter = express.Router();
const upload = multer({storage: storage})

prodRouter.get('/products', getAllProducts)
prodRouter.post('/products/upload', upload.single('photo'), addProduct)
prodRouter.get('/products/:prodId', getProduct)
prodRouter.patch('/products/:prodId', updateProduct)
prodRouter.delete('/products/:prodId', deleteProduct)

export default prodRouter;