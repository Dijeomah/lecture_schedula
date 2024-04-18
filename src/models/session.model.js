// session.model.js
const { DataTypes } = require('sequelize');
const sequelize = require("./sequelize.config");
const { commonAttributes } = require('./attributes');

const Session = sequelize.define('Session', {
    ...commonAttributes,
    session: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'sessions',
    paranoid: true,
});

module.exports = Session;
