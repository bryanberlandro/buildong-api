import express from 'express';
import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';

const reviewRouter = express.Router();

reviewRouter.get('/reviews', async(req, res) => {
    try {
        const reviews = await Review.find({})
        res.status(200).json(reviews)
    } catch(err) {
        res.status(404).json({message: err.message});
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