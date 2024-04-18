const {DataTypes} = require('sequelize');
const sequelize = require("./sequelize.config");
const {commonAttributes} = require('./attributes');

const ApplicationConfig = sequelize.define('ApplicationConfig', {
    ...commonAttributes,
    app_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    app_logo_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    app_desc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    facebook_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    twitter_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    instagram_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    other_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'application_config',
    paranoid: true,
});

module.exports = ApplicationConfig;