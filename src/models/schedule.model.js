const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
const {commonAttributes} = require('./attributes');

const LectureData = require('./lectureData.model');
const LectureHall = require('./lectureHall.model');
const TimeSlot = require('./timeSlot.model');

const Schedule = sequelize.define('Schedule', {

    ...commonAttributes,
    lectureDataId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LectureData,
            key: 'id'
        }
    },
    lectureHallId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LectureHall,
            key: 'id'
        }
    },
    timeSlotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TimeSlot,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('active', 'completed'),
        defaultValue: 'active'
    }
}, {
    tableName: 'schedules',
    paranoid: true,
});

Schedule.hasOne(LectureData);
LectureData.belongsTo(Schedule);

Schedule.hasOne(LectureHall);
LectureHall.belongsTo(Schedule);

Schedule.hasOne(TimeSlot);
TimeSlot.belongsTo(Schedule);

module.exports = Schedule;
