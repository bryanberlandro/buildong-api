import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token tidak tersedia' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.user.id;
        req.userEmail = decoded.user.email
        req.userType = decoded.user.role;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token tidak valid' });
    }
}