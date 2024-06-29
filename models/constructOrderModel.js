import mongoose from "../utils/db.js";

const ConstructOrderSchema = mongoose.Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    order_id: { type: String, required: true, },
    project_start: { type: Date, required: true },
    project_duration: { type: String, required: true },
    total_workers: { type: Number, required: true },
    worker_salary: { type: Number, required: true },
    design_name: { type: String, required: true },
    furniture_cost: { type: Number, required: true},
    location: { type: String, required: true },
    address: { type: String, required: true },
    payment_method: { type: String, required: true },
    total_price: { type: Number, required: true },
    image: [{ type: String, required: true }],
    square_meters: { type: Number, required: true },
    style: { type: String, required: true },
    category: { type: String, required: true },
    order_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Packed', 'Shipped', 'Completed'], default: 'Pending' }
})

const ConstructionOrder = mongoose.model('ConstructionOrder', ConstructOrderSchema)
export default ConstructionOrder