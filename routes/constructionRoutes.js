import express from 'express';
import { storage } from '../config/cloudinaryConfig.js';
import multer from 'multer';
import { deleteConstruction, getAllConstructions, getOneConstruction, postConstruction, updateConstruction } from '../controllers/construction.js';
import Construction from '../models/constructionModel.js';
const constructRouter = express.Router();
const upload = multer({storage: storage})

constructRouter.get('/constructions', getAllConstructions)
constructRouter.post('/constructions/upload', upload.array('photo', 3), postConstruction)
constructRouter.get('/:constructionId/reviews', async (req, res) => {
    try {
        const { page, limit } = req.query;
        const selectedItem = await Construction.findById(req.params.constructionId)
            .populate({
                path: 'reviews',
                options: {
                    skip: (page - 1) * limit,
                    limit: parseInt(limit)
                }
            });
        
        const totalReviews = await Construction.findById(req.params.constructionId).populate('reviews').countDocuments();

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
constructRouter.get('/constructions/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const constructions = await Construction.find({ category });
        res.json(constructions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
constructRouter.get('/constructions/style/:style', async (req, res) => {
    try {
        const { style } = req.params;
        const constructions = await Construction.find({ style });
        res.json(constructions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

constructRouter.route('/constructions/:constructionId')
    .get(getOneConstruction)
    .patch(updateConstruction)
    .delete(deleteConstruction)

export default constructRouter;