const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
const {commonAttributes} = require('./attributes');
const LecturerData = require('./lecturerData.model')
const Department = require('./department.model')
const Course = require('./course.model')
const Session = require('./session.model')
const Semester = require('./semester.model')
const User = require("./user.model");
// const Schedule = require('./schedule.model')

const LectureData = sequelize.define('LectureData', {

    ...commonAttributes,
    lecturerDataId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LecturerData,
            key: 'id'
        }
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Department,
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
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
    semesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Semester,
            key: 'id'
        }
    },
}, {
    tableName: 'lecture_data',
    paranoid: true,
});

// LectureData.hasOne(LecturerData);
// LecturerData.belongsTo(LectureData)
LecturerData.hasMany(LectureData, { foreignKey: 'lecturerDataId', as: 'lecturerData' });
LectureData.belongsTo(LecturerData, { foreignKey: 'lecturerDataId' });

// LectureData.hasOne(Department);
// Department.belongsTo(LectureData);
Department.hasMany(LectureData, { foreignKey: 'departmentId'});
LectureData.belongsTo(Department, { foreignKey: 'departmentId' });

// LectureData.hasOne(Course);
// Course.belongsTo(LectureData);
Course.hasMany(LectureData, { foreignKey: 'courseId', as: 'courses' });
LectureData.belongsTo(Course, { foreignKey: 'courseId' });

// LectureData.hasOne(Session);
// Session.belongsTo(LectureData);
Session.hasMany(LectureData, { foreignKey: 'sessionId', as: 'sessions' });
LectureData.belongsTo(Session, { foreignKey: 'sessionId' });

// LectureData.hasOne(Semester);
// Semester.belongsTo(LectureData);
Semester.hasMany(LectureData, { foreignKey: 'semesterId'});
LectureData.belongsTo(Semester, { foreignKey: 'semesterId' });

// LectureData.belongsTo(Department);
// LectureData.belongsTo(Course);
// LectureData.belongsTo(Session);
// LectureData.belongsTo(Semester);


module.exports = LectureData;