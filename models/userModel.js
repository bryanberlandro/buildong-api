import mongoose from "../utils/db";
import bcrypt from 'bcrypt';

const UserSchema = mongoose.Schema({
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true,
    },
    "registered_at": {
        type: Date,
        default: Date.now()
    }
})
UserSchema.pre('save', async (next) => {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

const User = mongoose.model('User', UserSchema);
export default User;