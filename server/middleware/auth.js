const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Check if token format is "Bearer <token>"
        const tokenPart = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

        const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET || 'secret_key_change_me');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
