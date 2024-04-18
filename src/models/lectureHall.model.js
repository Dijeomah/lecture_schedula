const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
const Department = require('./department.model')
// const Schedule = require('./schedule.model');
const {commonAttributes} = require('./attributes');
const LecturerData = require("./lecturerData.model");
// const User = require("./user.model");

const LectureHall = sequelize.define('LectureHall', {

    ...commonAttributes,
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Department,
            key: 'id'
        }
    },
    hallName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'MTH Hall',
        unique:true
    }
}, {
    tableName: 'lecture_halls',
    paranoid: true,
});

// Schedule.hasOne(LectureHall);
// LectureHall.belongsTo(Schedule,{foreignKey:'lectureHallId'});

Department.hasMany(LectureHall, { foreignKey: 'departmentId', as: 'lectureHalls' });
LectureHall.belongsTo(Department, { foreignKey: 'departmentId' });

// LectureHall.hasMany(Department)
// Department.belongsTo(LectureHall);



module.exports = LectureHall;