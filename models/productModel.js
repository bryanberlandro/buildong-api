import mongoose from "../utils/db.js";

const Product = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    image: [{
        type: String,
        required: true
    }],
    desc: {
        type: String,
        required: true
    },
    item_sold: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['furniture', 'kitchen', 'bathroom', 'outdoor', 'decor', 'storage', 'flooring', 'wall art', 'other'],
        default: 'other'
    },
    brand: {
        type: String,
        required: false
    },
    material: {
        type: String,
        required: true,
        enum: ['wood', 'metal', 'glass', 'plastic', 'fabric', 'leather', 'stone', 'ceramic', 'other'],
        default: 'other'
    },
    stock: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    published_at: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Product',Product);