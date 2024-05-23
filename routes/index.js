import express from 'express';
import prodRouter from './productRoutes.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello World!")
})

router.use(prodRouter)

export default router