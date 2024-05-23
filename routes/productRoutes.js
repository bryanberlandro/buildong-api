import express from 'express';
import Product from '../models/productModel.js';
const prodRouter = express.Router();

prodRouter.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products);
    } catch(err){
        res.status(500).send({message: err.message});
    }
})

prodRouter.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    try{
        const insertedProduct = await newProduct.save()
        res.status(200).json(insertedProduct)
    } catch(err) {
        res.status(400).send({message: err.message});
    }
})

prodRouter.get('/products/:id', async (req, res) => {
    try{
        const findProduct = await Product.findById(req.params.id)
        res.status(200).json(findProduct)
    } catch(err){
        res.status(400).send({message: err.message})
    }
})

prodRouter.patch('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne({_id: req.params.id}, {$set: req.body})
        res.status(200).json(updatedProduct)
    } catch(err) {
        res.status(400).send({message: err.message});
    }
})

prodRouter.delete('/products/:id', async (req, res) => {
    try{
        const deletedProduct = await Product.deleteOne({_id: req.params.id})
        res.status(200).json(deletedProduct)
    } catch(err) {
        res.status(400).send({message: err.message});
    }
})

export default prodRouter;