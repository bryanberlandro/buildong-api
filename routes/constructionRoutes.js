import express from 'express';
import Construction from '../models/constructionModel.js';
import getDuration from '../utils/getDuration.js';
import { storage } from '../config/cloudinaryConfig.js';
import multer from 'multer';
const constructRouter = express.Router();
const upload = multer({storage: storage})

constructRouter.get('/constructions', async(req, res) => {
    try {
        const allConstructions = await Construction.find({})
        res.status(200).json(allConstructions)
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

constructRouter.post('/constructions/upload', upload.single('photo'), async(req, res) => {
    const {start, finish, ...rest} = req.body
    const sumDuration = await getDuration(start, finish)
    const imgUrl = req.file.path

    try{
        const newConstruction = new Construction({
            project_timeline: {start, finish, duration: sumDuration},
            image: imgUrl,
            ...rest
        })
        await newConstruction.save();
        res.status(200).json({message: 'Success adding data', status: 200, data: newConstruction})
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

constructRouter.get('/constructions/:constructionId', async (req, res) => {
    try {
        const selectedItem = await Construction.findById(req.params.constructionId).populate('reviews');
        res.status(200).json(selectedItem);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
})

constructRouter.patch('/constructions/:constructionId', async (req, res) => {
    try {
        await Construction.updateOne({_id: req.params.constructionId}, {$set: req.body})
        res.status(200).json({message: 'Updated successfully'})
    } catch(err) {
        res.status(404).json({message: err.message});
    }
})

constructRouter.delete('/constructions/:constructionId', async (req, res) => {
    try {
        await Construction.deleteOne({_id: req.params.constructionId})
        res.status(200).json({message: "Item deleted successfully"})
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

export default constructRouter;