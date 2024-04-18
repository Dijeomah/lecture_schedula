const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
const {commonAttributes} = require('./attributes');
const Department = require('./department.model')
const Semester = require('./semester.model')

const Course = sequelize.define('Course', {

    ...commonAttributes,
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Department,
            key: 'id'
        }
    },
    semesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Semester,
            key: 'id'
        }
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    courseCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'courses',
    paranoid: true,
});

Department.belongsTo(Course, {foreignKey: 'departmentId', as: 'departments'});
Course.belongsTo(Department, {foreignKey: 'departmentId'});

Semester.belongsTo(Course, {foreignKey: 'semesterId', as: 'semesters'});
Course.belongsTo(Semester, {foreignKey: 'semesterId'});

module.exports = Course;

