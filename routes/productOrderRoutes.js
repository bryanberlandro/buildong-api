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

function generateOrderId() {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `ORD-${timestamp}-${randomPart}`.toUpperCase();
}

productOrderRouter.post('/:accountId/product-orders', async (req, res) => {
    try {
        const account = await Account.findById(req.params.accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const products = req.body.products;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'No products provided' });
        }

        let totalPointsToAdd = 0;
        const savedOrders = [];

        for (const product of products) {
            const newOrder = new ProductOrder({
                ...product,
                order_id: generateOrderId(),
                account_id: req.params.accountId
            });

            const savedOrder = await newOrder.save();
            savedOrders.push(savedOrder);

            const pointsToAdd = Math.floor(savedOrder.total_price / 10000);
            totalPointsToAdd += pointsToAdd;
            account.points += pointsToAdd;
            account.product_orders.push(savedOrder._id);
        }

        await account.save();

        res.status(201).json({
            status: 201,
            message: 'Successfully created product orders and updated points',
            data: savedOrders,
            pointsAdded: totalPointsToAdd,
            method: req.method
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default productOrderRouter;