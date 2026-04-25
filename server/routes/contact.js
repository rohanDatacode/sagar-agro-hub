const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { sendEmail } = require('../utils/email');

// @route   POST api/contact
// @desc    Submit a contact form
// @access  Public
router.post(
    '/',
    [
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('message', 'Message is required').not().isEmpty()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', errors: errors.array() });
        }

        const { name, email, phone, subject, message } = req.body;

        try {
            const newContact = await Contact.create({
                name,
                email,
                phone,
                subject,
                message,
            });

            // Trigger Email Notification to Admin
            try {
                await sendEmail(
                    'admin@sagarrajagro.com',
                    `New Website Contact: ${subject || 'No Subject'}`,
                    `New message from ${name} (${email}):\nPhone: ${phone}\nMessage: ${message}`,
                    `<h3>New Contact Submission</h3>
                     <p><strong>Name:</strong> ${name}</p>
                     <p><strong>Email:</strong> ${email}</p>
                     <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                     <hr/>
                     <p>${message}</p>`
                );
            } catch (emailErr) {
                console.error("Failed to send contact email, but contact saved:", emailErr);
            }

            res.json(newContact);
        } catch (err) {
            next(err);
        }
    }
);

// @route   GET api/contact
// @desc    Get all contact submissions
// @access  Private
router.get('/', auth, async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 100;
        const offset = (page - 1) * limit;
        
        let whereClause = {};
        if (req.query.status) {
            whereClause.status = req.query.status;
        }

        const { count, rows } = await Contact.findAndCountAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });
        
        // Backward compatibility approach: keeping array structure, wrapped gracefully just in case
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// @route   PUT api/contact/:id
// @desc    Update contact status
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { status } = req.body;
    try {
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        contact.status = status;
        await contact.save();
        res.json(contact);

    } catch (err) {
        next(err);
    }
});

module.exports = router;
