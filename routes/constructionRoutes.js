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
        const construction = await Construction.findById(req.params.constructionId).populate('reviews');
        if (!construction) {
            return res.status(404).json({ message: 'Construction not found' });
        }
        res.status(200).json({
            status: 200,
            message: "Successfully get "+construction.reviews.length+ " reviews",
            data: construction.reviews,
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