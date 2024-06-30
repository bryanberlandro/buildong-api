import express from 'express';
import Testimonial from '../models/testimonialModel.js';
import Construction from '../models/constructionModel.js';
const testiRouter = express.Router();

testiRouter.get('/testimonials', async(req, res) => {
    try {
        const allTestimonials = await Testimonial.find({});

        res.status(200).json(allTestimonials)
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

testiRouter.post('/constructions/:constructionId/testimonials', async(req, res) => {
    const params = req.params.constructionId;

    try{
        const construct = await Construction.findById(params);
        if (!construct) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        const newTestimonials = new Testimonial(req.body);
        const sendTestimonials = await newTestimonials.save()
        construct.reviews.push(sendTestimonials._id);

        await construct.save()
        res.status(200).json(newTestimonials);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

export default testiRouter;