import mongoose from "../utils/db.js";

const productOrderSchema = mongoose.Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    order_id: { type: String, required: true, },
    product_name: { type: String, required: true },
    quantity: { type: Number, required: true},
    location: { type: String, required: true },
    material: { type: String, required: true },
    total_price: { type: Number, required: true },
    image: [{ type: String, required: true }],
    category: { type: String, required: true },
    brand: { type: String, required: true },
    order_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Packed', 'Shipped', 'Completed'], default: 'Pending' }
})

const ProductOrder = mongoose.model('ProductOrder', productOrderSchema);
export default ProductOrder;