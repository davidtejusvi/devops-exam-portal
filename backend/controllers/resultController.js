const { Result, Exam } = require('../models');

/**
 * GET /api/results — get all results for logged-in user
 */
const getUserResults = async (req, res, next) => {
    try {
        const results = await Result.findAll({
            where: { userId: req.user.id },
            include: [{ model: Exam, as: 'exam', attributes: ['id', 'title', 'slug', 'category'] }],
            order: [['createdAt', 'DESC']],
        });
        res.json(results);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/results/:id — get a single result by ID
 */
const getResultById = async (req, res, next) => {
    try {
        const result = await Result.findOne({
            where: { id: req.params.id, userId: req.user.id },
            include: [{ model: Exam, as: 'exam' }],
        });
        if (!result) return res.status(404).json({ message: 'Result not found' });
        res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = { getUserResults, getResultById };
