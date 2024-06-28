import express from 'express';
import Account from '../models/accountModel.js';
import ProductOrder from '../models/productOrderModel.js';
const productOrderRouter = express.Router();

productOrderRouter.get('/:accountId/product-orders', async(req, res) => {
    try {
        const account = await Account.findById(req.params.accountId).populate('product_orders');
        if(!account){
            return res.status(404).json({message: 'Account not found'})
        }
        res.status(200).json({
            status: 200,
            message: 'Successfully get all product order',
            data: account,
            method: req.method
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

productOrderRouter.post('/:accountId/product-orders', async (req, res) => {
    try {
        const account = await Account.findById(req.params.accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const newOrder = new ProductOrder({
            ...req.body,
            account_id: req.params.accountId
        });

        const savedOrder = await newOrder.save();

        const pointsToAdd = Math.floor(savedOrder.total_price / 10000);
        account.points += pointsToAdd;
        account.product_orders.push(savedOrder._id);

        await account.save();

        res.status(201).json({
            status: 201,
            message: 'Successfully created product order and updated points',
            data: savedOrder,
            pointsAdded: pointsToAdd,
            method: req.method
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default productOrderRouter;