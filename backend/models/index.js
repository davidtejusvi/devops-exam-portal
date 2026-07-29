const User = require('./User');
const Exam = require('./Exam');
const Question = require('./Question');
const Result = require('./Result');

// Associations
User.hasMany(Result, { foreignKey: 'userId', as: 'results' });
Result.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Exam.hasMany(Question, { foreignKey: 'examId', as: 'questions', onDelete: 'CASCADE' });
Question.belongsTo(Exam, { foreignKey: 'examId', as: 'exam' });

Exam.hasMany(Result, { foreignKey: 'examId', as: 'results' });
Result.belongsTo(Exam, { foreignKey: 'examId', as: 'exam' });

module.exports = { User, Exam, Question, Result };
