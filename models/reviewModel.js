import mongoose from "../utils/db.js";

const reviewSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    user_image: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    like: {
        type: Number,
        required: false,
        default: 0
    },
    published_at: {
        type: Date,
        default: Date.now()
    }
})

const Review = mongoose.model('Review', reviewSchema);
export default Review;