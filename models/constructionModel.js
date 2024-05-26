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
        type: String,
        required: true,
        default: 0
    },
    "image": {
        type: String,
        required: true,
    },
    "square_meters": {
        type: Number,
        required: true,
    },
    "province": {
        type: String,
        required: true,
    },
    "category": {
        type: String,
        required: true
    },
    "descriptions": {
        type: String,
        required: true
    },
    "project_timeline": {
        "start": {
            type: Date,
            default: Date.now(),
            required: false
        },
        "finish": {
            type: Date,
            required: true
        },
        "duration": {
            type: String,
            required: true
        }
    },
    constructor: {
        type: String,
        required: true,
    },
    reviews: []
})

const Construction = mongoose.Model('Construction', constructionSchema);
export default Construction;