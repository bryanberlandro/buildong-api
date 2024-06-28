import mongoose from "../utils/db.js";

const AccountSchema = mongoose.Schema({
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    },
    "construction_orders": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConstructionOrder"
    }],
    "product_orders": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductOrder"
    }],
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
})

const Account = mongoose.model('Account', AccountSchema)
export default Account;