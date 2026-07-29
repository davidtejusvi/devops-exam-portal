const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Exam = sequelize.define('Exam', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        // e.g. 'docker', 'kubernetes', 'aws', 'terraform', etc.
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    category: {
        type: DataTypes.ENUM('docker', 'kubernetes', 'terraform', 'aws', 'linux', 'jenkins', 'git', 'devops'),
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
        defaultValue: 'intermediate',
    },
    durationMinutes: {
        type: DataTypes.INTEGER,
        defaultValue: 30,
    },
    passingScore: {
        type: DataTypes.INTEGER,
        defaultValue: 70, // percentage
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'exams',
    timestamps: true,
});

module.exports = Exam;
