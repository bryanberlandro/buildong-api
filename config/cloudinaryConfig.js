import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async(req, file) => {
    let folder = 'default';
    if(req.path.includes('/products/upload')){
      folder = 'products';
    } else if(req.path.includes('/constructions/upload')){
      folder = 'constructions';
    }
    
    return {
      folder: folder,
      public_id: `${Date.now()}-${file.originalname}`,
      resource_type: 'image',
    };
  },
});

export { cloudinary, storage };
