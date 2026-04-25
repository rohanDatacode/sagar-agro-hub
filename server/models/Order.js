const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        defaultValue: 'COD', // Cash On Delivery by default
    },
    paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Paid', 'Failed'),
        defaultValue: 'Pending',
    },
    deliveryStatus: {
        type: DataTypes.ENUM('Processing', 'Shipped', 'Delivered', 'Cancelled'),
        defaultValue: 'Processing',
    },
    estimatedDeliveryDate: {
        type: DataTypes.DATE,
        allowNull: true,
    }
});

module.exports = Order;
