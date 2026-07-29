const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Question = sequelize.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    examId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'exams', key: 'id' },
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    options: {
        // JSON array: ["Option A", "Option B", "Option C", "Option D"]
        type: DataTypes.JSON,
        allowNull: false,
    },
    correctOption: {
        type: DataTypes.INTEGER, // 0-based index of the correct option
        allowNull: false,
    },
    explanation: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    tableName: 'questions',
    timestamps: true,
});

module.exports = Question;
