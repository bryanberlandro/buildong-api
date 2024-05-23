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
    }
})

export default mongoose.model('Products',Product);