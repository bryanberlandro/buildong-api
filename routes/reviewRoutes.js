import express from 'express';
import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';
import getDuration from '../utils/getDuration.js';

const reviewRouter = express.Router();

reviewRouter.get('/reviews', async(req, res) => {
    try {
        const reviews = await Review.find({})
        res.status(200).json(reviews)
    } catch(err) {
        res.status(404).json({message: err.message});
    }
})

reviewRouter.post('/construction/:prodId/reviews', async(req, res) => {
    const prodId = req.params.prodId;

    try {
        const product = await Product.findById(prodId);
        if (!product) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        const newReview = new Review(req.body)

        const sendReview = await newReview.save()
        product.reviews.push(sendReview._id);
        await product.save();
        res.status(201).json(sendReview)
    } catch(err){
        res.status(400).json({message: err.message});
    }
})

reviewRouter.delete('/reviews/:reviewId', async (req, res) => {
    try {
        const deletedReview = await Review.deleteOne({_id: req.params.reviewId})
        res.status(200).json(deletedReview)
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
})

export default reviewRouter;