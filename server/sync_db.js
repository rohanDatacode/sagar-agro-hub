const sequelize = require('./config/database');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const Contact = require('./models/Contact');
const Admin = require('./models/Admin');

async function syncDatabase() {
    try {
        console.log('Connecting to database...');
        await sequelize.authenticate();
        console.log('Connection established successfully.');

        console.log('Force syncing database (Dropping tables and recreating)...');
        await sequelize.sync({ force: true });
        console.log('Database synced successfully!');
        
        console.log('\nIMPORTANT: All tables have been dropped and recreated to apply the latest schema changes.');
        console.log('Your database is now completely empty. Please run:');
        console.log('  node seed_products.js');
        console.log('to repopulate the database with default categories, products, and the admin account.');

    } catch (error) {
        console.error('Failed to sync database:', error);
    } finally {
        await sequelize.close();
        process.exit();
    }
}

syncDatabase();
