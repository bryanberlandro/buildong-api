import mongoose from "../utils/db.js";

const VoucherSchema = mongoose.Schema({
    "title": {
        type: String,
        required: true,
    },
    "description": {
        type: String,
        required: false
    },
    "minimum_order": {
        type: String,
        required: false,
        default: 0
    },
    "user_level": {
        type: String,
        required: false,
    },
    "discount_type": {
        type: String,
        required: true,
    },
    "total_discount": {
        type: String,
        required: true
    }
})

const Voucher = mongoose.model('Voucher', VoucherSchema);
export default Voucher;