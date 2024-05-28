import express from 'express';
import { storage } from '../config/cloudinaryConfig.js';
import multer from 'multer';
import { deleteConstruction, getAllConstructions, getOneConstruction, postConstruction, updateConstruction } from '../controllers/construction.js';
const constructRouter = express.Router();
const upload = multer({storage: storage})

constructRouter.get('/constructions', getAllConstructions)
constructRouter.post('/constructions/upload', upload.single('photo'), postConstruction)

constructRouter.route('/constructions/:constructionId')
    .get(getOneConstruction)
    .patch(updateConstruction)
    .delete(deleteConstruction)

export default constructRouter;