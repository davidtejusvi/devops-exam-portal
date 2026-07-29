const { verifyToken } = require('../config/jwt');
const { User } = require('../models');

/**
 * Protect routes — requires a valid JWT in the Authorization header.
 */
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] },
        });
        if (!user || !user.isActive) {
            return res.status(401).json({ message: 'User not found or inactive' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalid or expired' });
    }
};

/**
 * Restrict to admin role only. Must be used after `protect`.
 */
const adminOnly = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

module.exports = { protect, adminOnly };
