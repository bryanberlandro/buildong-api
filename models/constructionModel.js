import mongoose from "../utils/db.js";

const constructionSchema = mongoose.Schema({
    "design_name": {
        type: String,
        required: true
    },
    "location": {
        type: String,
        required: true
    },
    "total_price": {
        type: Number,
        required: true,
        default: 0
    },
    "image": [{
        type: String,
        required: true,
    }],
    "square_meters": {
        type: Number,
        required: true,
    },
    "style": {
        type: String,
        required: true,
        enum: ['minimalist', 'modern', 'vintage', 'industrial', 'scandinavian', 'rustic', 'mediterranean', 'other'],
        default: 'other'
    },
    "category": {
        type: String,
        required: true,
        enum: ['house', 'bedroom', 'office', 'kitchen', 'living room', 'school', 'bathroom', 'dining room', 'other'],
        default: 'other'
    },
    "descriptions": {
        type: String,
        required: true
    },
    "worker": {
        type: String,
        required: true,
    },
    "project_duration": {
        type: String,
        required: true
    },
    "reviews": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Testimonial',
        required: false
    }]
})

const Construction = mongoose.model('Construction', constructionSchema);
export default Construction;