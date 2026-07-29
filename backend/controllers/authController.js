const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../config/jwt');

/**
 * POST /api/auth/register
 */
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const hashed = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, password: hashed });

        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });

        // Debug log — remove after confirming login works
        console.log('Login attempt:', {
            email,
            found: !!user,
            hasPassword: !!user?.password,
            isActive: user?.isActive,
            isActiveType: typeof user?.isActive,
        });

        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Handle both boolean true and integer 1 from MySQL TINYINT
        const active = user.isActive === true || user.isActive === 1 || user.isActive === '1';
        if (!active) {
            return res.status(403).json({ message: 'Account deactivated' });
        }

        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/auth/me — return current user from token
 */
const getMe = async (req, res) => {
    const { id, name, email, role, avatar, bio } = req.user;
    res.json({ id, name, email, role, avatar, bio });
};

module.exports = { register, login, getMe };
