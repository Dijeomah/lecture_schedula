const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
const {commonAttributes} = require('./attributes');
const User = require('./user.model')

const LecturerData = sequelize.define('LecturerData', {

    ...commonAttributes,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    salutation: {
        type: DataTypes.STRING,
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
    tableName: 'lecturer_data',
    paranoid: true,
});

User.hasOne(LecturerData, { foreignKey: 'userId', as: 'lecturerData' });
LecturerData.belongsTo(User, { foreignKey: 'userId' });
//
// LecturerData.hasOne(User)
// User.belongsTo(LecturerData)


module.exports = LecturerData;