import mongoose from "../utils/db";
import bcrypt from 'bcrypt';

const AdminSchema = mongoose.Schema({
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    }
})

AdminSchema.pre('save', async (next) => {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;