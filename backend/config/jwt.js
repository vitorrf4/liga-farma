const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        const token = header.substring(7, header.length);
        if (!token) {
            return res.status(401).json({ 
                message: 'Necessário token para completar a requisição' 
            });
        }
        
        req.user = jwt.verify(token, secret);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports.verifyToken = verifyToken;