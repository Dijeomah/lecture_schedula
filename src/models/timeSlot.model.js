const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
// const Schedule = require('./schedule.model');
const {commonAttributes} = require('./attributes');

const TimeSlot = sequelize.define('TimeSlot', {

    ...commonAttributes,
    day: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
    }
}, {
    tableName: 'time_slot',
    paranoid: true,
});

// Schedule.hasOne(TimeSlot);
// TimeSlot.belongsTo(Schedule,{foreignKey:'timeSlotId'});

module.exports = TimeSlot;