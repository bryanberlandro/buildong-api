import mongoose from "../utils/db.js";

const testimonialSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    user_image: {
        type: String,
        required: true
    },
    construction_id: {
        type: String,
        required: true
    },
    construction_name: {
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

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;