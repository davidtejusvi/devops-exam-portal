const { Exam, Question } = require('../models');

/**
 * GET /api/exams — list all active exams
 */
const listExams = async (req, res, next) => {
    try {
        const exams = await Exam.findAll({
            where: { isActive: true },
            attributes: ['id', 'title', 'slug', 'description', 'category', 'difficulty', 'durationMinutes', 'passingScore'],
        });
        res.json(exams);
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/exams/:slug — get exam with questions (no correct answers exposed)
 */
const getExamBySlug = async (req, res, next) => {
    try {
        const exam = await Exam.findOne({
            where: { slug: req.params.slug, isActive: true },
            include: [{
                model: Question,
                as: 'questions',
                attributes: ['id', 'text', 'options', 'points'], // correctOption excluded
            }],
        });
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        res.json(exam);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/exams/:slug/submit — submit answers, calculate score
 */
const submitExam = async (req, res, next) => {
    try {
        const { answers, timeTakenSeconds } = req.body;
        // answers: { [questionId]: selectedOptionIndex }

        const exam = await Exam.findOne({
            where: { slug: req.params.slug, isActive: true },
            include: [{ model: Question, as: 'questions' }],
        });
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        let correct = 0;
        const Result = require('../models/Result');

        exam.questions.forEach((q) => {
            if (answers[q.id] !== undefined && Number(answers[q.id]) === q.correctOption) {
                correct++;
            }
        });

        const total = exam.questions.length;
        const score = total > 0 ? parseFloat(((correct / total) * 100).toFixed(2)) : 0;
        const passed = score >= exam.passingScore;

        const result = await Result.create({
            userId: req.user.id,
            examId: exam.id,
            score,
            totalQuestions: total,
            correctAnswers: correct,
            timeTakenSeconds: timeTakenSeconds || null,
            answers,
            passed,
        });

        // Return result with correct answers for review
        const questionsWithAnswers = exam.questions.map((q) => ({
            id: q.id,
            text: q.text,
            options: q.options,
            correctOption: q.correctOption,
            explanation: q.explanation,
            selected: answers[q.id] ?? null,
        }));

        res.json({ result, questions: questionsWithAnswers });
    } catch (err) {
        next(err);
    }
};

module.exports = { listExams, getExamBySlug, submitExam };
