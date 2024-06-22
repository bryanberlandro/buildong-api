import express from 'express';
import { verifyToken } from '../middleware/middleware.js';
import Admin from '../models/adminModel.js';
const adminRouter = express.Router();

adminRouter.get('/admin', verifyToken, async(req, res) => {
    try {
        const isAdminExsist = await Admin.findById(req.userId, {password:0})
        if(!isAdminExsist){
            return res.status(404).json({msg: "User not found"})
        }

        res.status(200).json({
            msg: "Successfully get data",
            status: 200,
            data: isAdminExsist,    
            method: req.method
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default adminRouter;