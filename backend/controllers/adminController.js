const { User, Exam, Question, Result } = require('../models');

// ── Users ────────────────────────────────────────────────────────────────────

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const toggleUserStatus = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.update({ isActive: !user.isActive });
        res.json({ message: `User ${user.isActive ? 'activated' : 'deactivated'}` });
    } catch (err) {
        next(err);
    }
};

// ── Exams ────────────────────────────────────────────────────────────────────

const createExam = async (req, res, next) => {
    try {
        const exam = await Exam.create(req.body);
        res.status(201).json(exam);
    } catch (err) {
        next(err);
    }
};

const updateExam = async (req, res, next) => {
    try {
        const exam = await Exam.findByPk(req.params.id);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        await exam.update(req.body);
        res.json(exam);
    } catch (err) {
        next(err);
    }
};

const deleteExam = async (req, res, next) => {
    try {
        const exam = await Exam.findByPk(req.params.id);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        await exam.destroy();
        res.json({ message: 'Exam deleted' });
    } catch (err) {
        next(err);
    }
};

// ── Questions ────────────────────────────────────────────────────────────────

const addQuestion = async (req, res, next) => {
    try {
        const exam = await Exam.findByPk(req.params.examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        const question = await Question.create({ ...req.body, examId: exam.id });
        res.status(201).json(question);
    } catch (err) {
        next(err);
    }
};

const updateQuestion = async (req, res, next) => {
    try {
        const q = await Question.findByPk(req.params.id);
        if (!q) return res.status(404).json({ message: 'Question not found' });
        await q.update(req.body);
        res.json(q);
    } catch (err) {
        next(err);
    }
};

const deleteQuestion = async (req, res, next) => {
    try {
        const q = await Question.findByPk(req.params.id);
        if (!q) return res.status(404).json({ message: 'Question not found' });
        await q.destroy();
        res.json({ message: 'Question deleted' });
    } catch (err) {
        next(err);
    }
};

// ── Stats ────────────────────────────────────────────────────────────────────

const getStats = async (req, res, next) => {
    try {
        const [totalUsers, totalExams, totalResults] = await Promise.all([
            User.count(),
            Exam.count(),
            Result.count(),
        ]);
        res.json({ totalUsers, totalExams, totalResults });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUsers, toggleUserStatus,
    createExam, updateExam, deleteExam,
    addQuestion, updateQuestion, deleteQuestion,
    getStats,
};
