import express from 'express';
import { storage } from '../config/cloudinaryConfig.js';
import multer from 'multer';
import { deleteConstruction, getAllConstructions, getOneConstruction, postConstruction, updateConstruction } from '../controllers/construction.js';
import Construction from '../models/constructionModel.js';
const constructRouter = express.Router();
const upload = multer({storage: storage})

constructRouter.get('/constructions', getAllConstructions)
constructRouter.post('/constructions/upload', upload.array('photo', 3), postConstruction)
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