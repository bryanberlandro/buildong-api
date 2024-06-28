import express from 'express';
import prodRouter from './productRoutes.js';
import reviewRouter from './reviewRoutes.js';
import authRouter from './authRoutes.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import constructRouter from './constructionRoutes.js';
import testiRouter from './testimonialRoutes.js';
import adminRouter from './adminRoutes.js';
import accountRouter from './accountRoutes.js';
import constructOrderRouter from './constructOrderRoutes.js';
import productOrderRouter from './productOrderRoutes.js';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY
const router = express.Router();

// function tokenWare(req, res, next){
//     const token = req.header('x-auth-token');

//     if(!token){
//         return res.status(401).json({message: 'No token, authorization denied'});
//     }

//     try{
//         const decoded = jwt.verify(token, SECRET_KEY);
//         req.user = decoded.user;
//         next();
//     } catch(err) {
//         res.status(401).json({ msg: 'Token is not valid' });
//     }
// }

router.get('/', (req, res) => {
    const initialPath = {
        "endpoints": [
            {
                "path": "https://buildong-api.vercel.app/products",
                "description": "get all products" 
            },
            {
                "path": "https://buildong-api.vercel.app/products/:id",
                "description": "get one product" 
            },
            {
                "path": "https://buildong-api.vercel.app/",
                "description": "get all products" 
            },
            {
                "path": "https://buildong-api.vercel.app/products",
                "description": "get all products" 
            },
        ],
        "maintainer": "Bryan Berlandro G.S"
    } 
    res.json(initialPath)
})

router.use(adminRouter)
router.use(accountRouter)
router.use(testiRouter)
router.use(constructRouter)
router.use(reviewRouter)
router.use(prodRouter)
router.use(constructOrderRouter)
router.use(productOrderRouter)
router.use(authRouter) //token ware 

export default router