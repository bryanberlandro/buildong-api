import express from 'express';
import User from '../models/userModel.js';
import Admin from '../models/adminModel.js'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import regValid from '../validation/regValidation.js';
import loginValid from '../validation/loginValidation.js';
dotenv.config();
const authRouter = express.Router();
const SECRET_KEY = process.env.SECRET_KEY

authRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const validation = await regValid(email, password);
        if(validation.msg.length > 0){
            return res.status(400).json({message: validation.msg})
        }

        let user = await User.findOne({ email })
        console.log(user)
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }

        user = new User({
            email,
            password
        })
        await user.save();

        const payload = {
            user: {
                id: user._id,
                email: user.email
            }
        };

        jwt.sign(payload, SECRET_KEY, {expiresIn: "3d"}, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
})

authRouter.post('/add-admin', async (req, res) => {
    const { email, password } = req.body;

    try {
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        admin = new Admin({
            email,
            password
        });

        await admin.save();

        res.status(200).res.json({ message: 'Admin account created successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const validation = await loginValid(email, password);
        if(validation.msg.length > 0){
            return res.status(400).json({message: validation.msg})
        }
        
        let admin = await Admin.findOne({ email });
        if(admin){
            const isMatch = await bcrypt.compare(password, admin.password);
            if(!isMatch){
                return res.status(400).json({message: 'Invalid Password'}) 
            }
            const payload = {
                user: {
                    id: admin._id,
                    email: admin.email,
                    role: "admin"
                }
            }

            jwt.sign(payload, SECRET_KEY, { expiresIn: '3d' }, (err, token) => {
                if (err) throw err;
                res.json({ 
                    status: "200",
                    message: 'Login successful! Welcome back '+user.email,
                    token: token,
                    role: "admin"
                });
            });
            return;
        }

        let user = await User.findOne({ email });
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({message: 'Invalid Password. Please check your password and try again'})
            }
            const payload = {
                user: {
                    id: user._id,
                    email: user.email,
                    role: "user"
                }
            }

            jwt.sign(payload, SECRET_KEY, { expiresIn: '3d' }, (err, token) => {
                if (err) throw err;
                res.json({ 
                    status: "200",
                    message: 'Login successful! Welcome back '+user.email,
                    token: token,
                    role: "user"
                });
            });
            return;
        }

        return res.status(400).json({ message: 'Email not registered. Please sign up to create an account' });
    } catch(err){
        console.log(err)
    }
})

export default authRouter