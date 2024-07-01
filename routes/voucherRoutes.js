import express from 'express';
import Voucher from '../models/voucherModel.js';
const voucherRouter = express.Router();

voucherRouter.post('/vouchers', async (req, res) => {
    try {
        const voucher = new Voucher(req.body);
        await voucher.save();
        res.status(201).send(voucher);
    } catch (error) {
        res.status(400).send(error);
    }
});

voucherRouter.get('/vouchers', async (req, res) => {
    const userLevel = req.query.level;
    if (!['bronze', 'silver', 'gold', 'diamond'].includes(userLevel)) {
        return res.status(400).send({ error: 'Invalid user level' });
    }
    try {
        const vouchers = await Voucher.find({ user_level: userLevel });
        res.status(200).send(vouchers);
    } catch (error) {
        res.status(500).send(error);
    }
});

voucherRouter.delete('/vouchers/:id', async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndDelete(req.params.id);
        if (!voucher) {
            return res.status(404).send({ error: 'Voucher not found' });
        }
        res.status(200).send({ message: 'Voucher deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default voucherRouter;
