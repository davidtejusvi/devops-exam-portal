const router = require('express').Router();
const { protect } = require('../middleware/auth');
const { listExams, getExamBySlug, submitExam } = require('../controllers/examController');

router.get('/', listExams);
router.get('/:slug', protect, getExamBySlug);
router.post('/:slug/submit', protect, submitExam);

module.exports = router;
