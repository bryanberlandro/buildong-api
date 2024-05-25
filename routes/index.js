import express from 'express';
import prodRouter from './productRoutes.js';
import reviewRouter from './reviewRoutes.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello World!")
})

router.use(reviewRouter)
router.use(prodRouter)

export default router