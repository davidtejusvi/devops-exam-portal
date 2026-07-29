const router = require('express').Router();
const passport = require('passport');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { generateToken } = require('../config/jwt');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        const token = generateToken({ id: req.user.id, email: req.user.email, role: req.user.role });
        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    }
);

module.exports = router;
