import express from 'express';
import Account from '../models/accountModel.js';
import ConstructionOrder from '../models/constructOrderModel.js';
const constructOrderRouter = express.Router();

constructOrderRouter.get('/:accountId/construction-orders', async(req, res) => {
    try {
        const account = await Account.findById(req.params.accountId).populate('construction_orders');
        if(!account){
            return res.status(404).json({message: 'Account not found'})
        }
        res.status(200).json({
            status: 200,
            message: 'Successfully get all construction order',
            data: account,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

constructOrderRouter.post('/:accountId/construction-orders', async(req, res) => {
    try {
        const account = await Account.findById({_id: req.params.accountId});
        if(!account){
            return res.status(404).json({message: 'Account not found'})
        }
        const newOrder = new ConstructionOrder({
            ...req.body,
            account_id: req.params.accountId
        })

        const savedOrder = await newOrder.save();

        const pointsToAdd = Math.floor(savedOrder.total_price / 100000);
        account.points += pointsToAdd;
        account.construction_orders.push(savedOrder._id);

        await account.save();

        res.status(201).json({
            status: 201,
            message: 'Successfully created construction order and updated points',
            data: savedOrder,
            pointsAdded: pointsToAdd,
            method: req.method
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default constructOrderRouter