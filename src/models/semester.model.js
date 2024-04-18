const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
const {commonAttributes} = require('./attributes');
const Course = require("./course.model");

const Semester = sequelize.define('Semester', {

    ...commonAttributes,
    semester: {
        type: DataTypes.ENUM('1st_semester', '2nd_semester'),
        defaultValue: "1st_semester"
    }
}, {
    tableName: 'semesters',
    paranoid: true,
});
// Course.belongsTo(Semester, {foreignKey: 'semesterId'});

module.exports = Semester;

