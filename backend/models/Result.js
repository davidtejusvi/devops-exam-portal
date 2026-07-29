const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Result = sequelize.define('Result', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    examId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'exams', key: 'id' },
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: false, // percentage 0-100
    },
    totalQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    correctAnswers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timeTakenSeconds: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    answers: {
        // JSON: { questionId: selectedOptionIndex, ... }
        type: DataTypes.JSON,
        allowNull: true,
    },
    passed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'results',
    timestamps: true,
});

module.exports = Result;
