import mongoose from "../utils/db.js";

const AccountSchema = mongoose.Schema({
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    },
    "username": {
        type: String,
        required: false,
        unique: true
    },
    "phone": {
        type: String,
        required: false,
    },
    "address": {
        type: String,
        required: false,
    },
    "profile_picture": {
        type: String,
        required: false,
    },
    "points": {
        type: Number,
        default: 0,
        required: false
    },
    "order_history" : [
        {
            "order_type": { type: String, enum: ['construction', 'product'], required: true },
            "order_id": { type: mongoose.Schema.Types.ObjectId, required: true }
        }
    ]
})

const Account = mongoose.model('Account', AccountSchema)
export default Account;