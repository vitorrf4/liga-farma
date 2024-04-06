const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        const token = header.substring(7, header.length);
        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }
        
        req.user = jwt.verify(token, secret);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports.verifyToken = verifyToken;