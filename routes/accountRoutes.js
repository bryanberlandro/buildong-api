import express from 'express';
import { verifyToken } from '../middleware/middleware.js';
import User from '../models/userModel.js';
import Account from '../models/accountModel.js';
import { storage } from '../config/cloudinaryConfig.js';
import dotenv from 'dotenv';
import multer from 'multer';
import cloudinary from 'cloudinary'
const accountRouter = express.Router();
const upload = multer({storage: storage})

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

accountRouter.get('/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('account');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


accountRouter.get('/account', verifyToken, async(req, res) => {
    try {
        const account = await Account.findOne({ user: req.userId }).populate('user')
        console.log(account)
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ account });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

accountRouter.post('/account', verifyToken, upload.single('photo'), async (req, res) => {
    try {
        const { username, phone, address } = req.body;
        const imgUrl = req.file ? req.file.path : null;

        const existingAccount = await Account.findOne({ username });
        if (existingAccount) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newAccount = new Account({
            user: req.userId,
            username,
            phone,
            address,
            profile_picture: imgUrl
        });
        await newAccount.save();

        const user = await User.findById(req.userId);
        user.account = newAccount._id;
        await user.save();

        res.status(201).json({
            status: 201,
            message: 'Account created successfully',
            data: newAccount,
            method: req.method
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


accountRouter.patch('/account', verifyToken, upload.single('photo'), async (req, res) => {
    try {
      const { username, phone, address } = req.body;
      const imgUrl = req.file ? req.file.path : null;
      const publicId = req.file ? req.file.filename : null; // Ambil public_id dari file yang di-upload
  
      // Cari akun berdasarkan user ID
      const account = await Account.findOne({ user: req.userId });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
  
      // Periksa apakah username sudah digunakan oleh user lain
      const existingAccount = await Account.findOne({ username, user: { $ne: req.userId } });
      if (existingAccount) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Jika ada foto baru, hapus foto lama dari Cloudinary
      if (imgUrl && account.profile_picture) {
        const oldPublicId = account.profile_picture.split('/').pop().split('.')[0]; // Ambil public_id dari URL lama
        await cloudinary.uploader.destroy(oldPublicId);
      }
  
      const updateData = {
        username: username || account.username,
        phone: phone || account.phone,
        address: address || account.address,
        profile_picture: imgUrl || account.profile_picture
      };
  
      // Update data akun
      const updatedAccount = await Account.findOneAndUpdate(
        { user: req.userId },
        updateData,
        { new: true }
      );
  
      res.status(200).json({
        status: 200,
        message: 'Account updated successfully',
        data: updatedAccount,
        method: req.method
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

accountRouter.delete('/account', verifyToken, async (req, res) => {
    try {
        const account = await Account.findOneAndDelete({ user: req.userId });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (account.profile_picture) {
            const publicId = account.profile_picture.split('/').pop().split('.')[0];
            await cloudinary.v2.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }
            });
        }

        await User.findByIdAndDelete(account.user);

        res.status(200).json({
            status: 200,
            message: 'Account and user deleted successfully',
            method: req.method
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default accountRouter;