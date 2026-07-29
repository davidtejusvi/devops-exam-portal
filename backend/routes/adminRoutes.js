const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
    getAllUsers, toggleUserStatus,
    createExam, updateExam, deleteExam,
    addQuestion, updateQuestion, deleteQuestion,
    getStats,
} = require('../controllers/adminController');

router.use(protect, adminOnly); // All admin routes require auth + admin role

// Stats
router.get('/stats', getStats);

// Users
router.get('/users', getAllUsers);
router.patch('/users/:id/toggle', toggleUserStatus);

// Exams
router.post('/exams', createExam);
router.put('/exams/:id', updateExam);
router.delete('/exams/:id', deleteExam);

// Questions
router.post('/exams/:examId/questions', addQuestion);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

module.exports = router;
