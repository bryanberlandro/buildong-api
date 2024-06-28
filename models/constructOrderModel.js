import mongoose from "../utils/db.js";

const ConstructOrderSchema = mongoose.Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Construction', required: true },
    project_timeline: {
        start: { type: Date, required: true },
        finish: { type: Date, required: true },
        duration: { type: String, required: true }
    },
    design_name: { type: String, required: true },
    location: { type: String, required: true },
    total_price: { type: Number, required: true },
    image: [{ type: String, required: true }],
    square_meters: { type: Number, required: true },
    style: { type: String, required: true },
    category: { type: String, required: true },
    order_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Packed', 'Shipped', 'Completed'], default: 'pending' }
})

const ConstructionOrder = mongoose.model('ConstructionOrder', ConstructOrderSchema)
export default ConstructionOrder