// school.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize.config');
// const Department = require('./department.model');
const { commonAttributes } = require('./attributes');

const School = sequelize.define('School', {
    ...commonAttributes,
    schoolName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'schools',
    paranoid: true,
});

// School.hasMany(Department, { foreignKey: 'schoolId' }); // School has many Departments

module.exports = School;
