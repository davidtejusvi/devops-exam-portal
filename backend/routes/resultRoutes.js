const router = require('express').Router();
const { protect } = require('../middleware/auth');
const { getUserResults, getResultById } = require('../controllers/resultController');

router.get('/', protect, getUserResults);
router.get('/:id', protect, getResultById);

module.exports = router;
