import mongoose from "../utils/db.js";

const PhotoSchema = mongoose.Schema({
    url: String,
    uploadedAt: { type: Date, default: Date.now }
})

const Photo = mongoose.model('Photo', PhotoSchema);
export default Photo