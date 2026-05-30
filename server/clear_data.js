const { Sequelize } = require('sequelize');
const path = require('path');

async function clearData() {
    try {
        const Category = require('./models/Category');
        const Product = require('./models/Product');
        const sequelize = require('./config/database');

        console.log('Connecting to database...');
        await sequelize.authenticate();

        console.log('Clearing Products...');
        await Product.destroy({ where: {}, truncate: true });

        console.log('Clearing Categories...');
        await Category.destroy({ where: {}, truncate: true });

        console.log('All products and categories have been removed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing data:', error);
        process.exit(1);
    }
}

clearData();
