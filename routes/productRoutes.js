import express from 'express';
import Product from '../models/productModel.js';
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/products.js';
const prodRouter = express.Router();

prodRouter.get('/products', getAllProducts)
prodRouter.post('/products', addProduct)
prodRouter.get('/products/:prodId', getProduct)
prodRouter.patch('/products/:prodId', updateProduct)
prodRouter.delete('/products/:prodId', deleteProduct)

export default prodRouter;