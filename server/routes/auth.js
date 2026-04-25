const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { body, validationResult } = require('express-validator');

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post(
    '/login',
    [
        body('username', 'Please include a valid username/email').not().isEmpty(),
        body('password', 'Password is required').exists()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            // Check for user
            const admin = await Admin.findOne({ where: { username } });
            if (!admin) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Return JWT
            const payload = {
                admin: {
                    id: admin.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET || 'secret_key_change_me',
                { expiresIn: '1d' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            next(err);
        }
    }
);

// @route   POST api/auth/seed
// @desc    Create initial admin account (Dev only)
// @access  Public (Should be protected or removed in prod)
router.post('/seed', async (req, res) => {
    try {
        const { username, password, adminSecret } = req.body;

        // Simple security check to prevent unauthorized seeding
        if (adminSecret !== process.env.ADMIN_SECRET) {
            return res.status(403).json({ message: 'Forbidden: Invalid Admin Secret' });
        }

        let admin = await Admin.findOne({ where: { username } });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        admin = await Admin.create({
            username,
            password,
        });

        res.json({ message: 'Admin created successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
