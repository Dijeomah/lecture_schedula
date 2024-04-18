const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
const {commonAttributes} = require('./attributes');
const User = require('./user.model')

const AdminData = sequelize.define('AdminData', {

    ...commonAttributes,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
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
    tableName: 'admin_data',
    paranoid: true,
});

User.hasOne(AdminData, { foreignKey: 'userId', as: 'adminData' });
AdminData.belongsTo(User, { foreignKey: 'userId' });

module.exports = AdminData;