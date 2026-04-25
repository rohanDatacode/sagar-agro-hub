const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow any localhost origin
        if (origin.match(/^http:\/\/localhost:[0-9]+$/)) {
            return callback(null, true);
        }

        // Block other origins
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    credentials: true
}));
app.use(express.json());

// Security Middlewares
app.use(helmet()); // Sets various HTTP headers for security

// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 150, // limit each IP to 150 requests per windowMs
    message: { status: 'error', message: 'Too many requests, please try again later.' }
});
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Ensure associations are loaded before database sync
require('./models/OrderItem');

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);
    // Send a structured error response, avoid sending full stack traces to the client
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database sync error:', err);
});
