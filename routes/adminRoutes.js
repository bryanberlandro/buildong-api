import express from 'express';
import { verifyToken } from '../middleware/middleware.js';
import Admin from '../models/adminModel.js';
import ConstructionOrder from '../models/constructOrderModel.js';
import ProductOrder from '../models/productOrderModel.js';
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

adminRouter.get('/admin/construction-orders/completed', verifyToken, async (req, res) => {
    try {
        const isAdminExist = await Admin.findById(req.userId, { password: 0 });
        if (!isAdminExist) {
            return res.status(404).json({ msg: "User not found" });
        }

        const completedOrders = await ConstructionOrder.find({ status: 'Completed' });
        if(completedOrders.length > 0){
            res.status(200).json({
                msg: "Successfully get completed construction orders",
                status: 200,
                data: completedOrders,
                method: req.method
            });
        } else {
            res.status(404).json({
                msg: "There is no completed construction orders",
                status: 404,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

adminRouter.get('/admin/product-orders/completed', verifyToken, async (req, res) => {
    try {
        const isAdminExist = await Admin.findById(req.userId, { password: 0 });
        if (!isAdminExist) {
            return res.status(404).json({ msg: "User not found" });
        }

        const completedOrders = await ProductOrder.find({ status: 'Completed' });
        if(completedOrders.length > 0){
            res.status(200).json({
                msg: "Successfully get completed product orders",
                status: 200,
                data: completedOrders,
                method: req.method
            });
        } else {
            res.status(404).json({
                msg: "There is no completed product orders",
                status: 404,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default adminRouter;