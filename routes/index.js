import express from 'express';
import prodRouter from './productRoutes.js';
import reviewRouter from './reviewRoutes.js';
import authRouter from './authRoutes.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY
const router = express.Router();

function tokenWare(req, res, next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

router.get('/', (req, res) => {
    res.send("Hello World!")
})

router.use(authRouter, tokenWare)
router.use(reviewRouter)
router.use(prodRouter)

export default router