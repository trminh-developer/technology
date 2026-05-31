const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'User' // 'User', 'Admin', 'Editor'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Active' // 'Active', 'Inactive', 'Pending'
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = User;
