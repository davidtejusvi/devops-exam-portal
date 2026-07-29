const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'fallback_secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate a signed JWT for a user payload.
 * @param {object} payload - Data to encode (e.g. { id, email, role })
 * @returns {string} signed JWT
 */
const generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
};

/**
 * Verify a JWT and return the decoded payload.
 * @param {string} token
 * @returns {object} decoded payload
 */
const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};

module.exports = { generateToken, verifyToken };
