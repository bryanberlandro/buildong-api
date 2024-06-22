import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token tidak tersedia' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userType = decoded.type;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token tidak valid' });
    }
}