import mongoose from "../utils/db.js";

const Product = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
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
        required: true
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