const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
const {commonAttributes} = require('./attributes');
const User = require('./user.model')

const StudentData = sequelize.define('StudentData', {

    ...commonAttributes,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
}, {
    tableName: 'student_data',
    paranoid: true,
});

User.hasOne(StudentData, {foreignKey: 'userId', as: 'studentData'});
StudentData.belongsTo(User, {foreignKey: 'userId'})

module.exports = StudentData;