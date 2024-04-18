// department.model.js
const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
// const Course = require('./course.model');
const Session = require('./session.model');
const {commonAttributes} = require('./attributes');
const School = require("./school.model");
// const User = require("./user.model");

const Department = sequelize.define('Department', {
    ...commonAttributes,
    schoolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: School,
            key: 'id'
        }
    },
    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Session,
            key: 'id'
        }
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'departments',
    paranoid: true,
});

// Department.hasOne(School, {foreignKey: 'schoolId'});
Session.hasMany(Department, {foreignKey: 'sessionId', as: 'departments'});
Department.belongsTo(Session, {foreignKey: 'sessionId'}); // Department belongs to Session

School.hasOne(Department, {foreignKey: 'schoolId', as: 'school'});
Department.belongsTo(School, {foreignKey: 'schoolId'});

// Department.hasMany(Course, { foreignKey: 'departmentId' }); // Department belongs to School

module.exports = Department;
