const bcrypt = require('bcryptjs');
const { User } = require('../models');

/**
 * GET /api/users/profile
 */
const getProfile = async (req, res) => {
    const { id, name, email, role, avatar, bio, createdAt } = req.user;
    res.json({ id, name, email, role, avatar, bio, createdAt });
};

/**
 * PUT /api/users/profile
 */
const updateProfile = async (req, res, next) => {
    try {
        const { name, bio } = req.body;
        const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updateData = {};
        if (name) updateData.name = name;
        if (bio !== undefined) updateData.bio = bio;
        if (avatar) updateData.avatar = avatar;

        await req.user.update(updateData);
        const { id, name: n, email, role, avatar: av, bio: b } = req.user;
        res.json({ id, name: n, email, role, avatar: av, bio: b });
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /api/users/change-password
 */
const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Both current and new password are required' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user.password) {
            return res.status(400).json({ message: 'OAuth users cannot set a password this way' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });

        const hashed = await bcrypt.hash(newPassword, 12);
        await user.update({ password: hashed });
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getProfile, updateProfile, changePassword };
