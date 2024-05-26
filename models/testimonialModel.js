import mongoose from "../utils/db.js";

const testimonialSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    construction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Construction',
        required: true
    },
    product_image: {
        type: String,
        required: false
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

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;