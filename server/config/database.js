const { Sequelize } = require('sequelize');
const path = require('path');

// Create a new Sequelize instance with SQLite dialect
// Initialize Sequelize based on DATABASE_URL or specific variables
let sequelize;

if (process.env.DATABASE_URL) {
    // If a cloud database URL is provided (e.g., Render, Railway setup for Postgres/MySql)
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false,
    });
} else {
    // Fall back to specific dialect and storage setup from .env
    sequelize = new Sequelize({
        dialect: process.env.DB_DIALECT || 'sqlite',
        storage: process.env.DB_STORAGE ? path.join(__dirname, '..', process.env.DB_STORAGE) : path.join(__dirname, '..', 'database.sqlite'),
        logging: false,
    });
}

module.exports = sequelize;
