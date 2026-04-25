const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route   GET api/products
// @desc    Get all products (with pagination limit)
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 100;
        const offset = (page - 1) * limit;

        const { count, rows } = await Product.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
        
        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            products: rows
        });
    } catch (err) {
        next(err);
    }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (err) {
        next(err);
    }
});

// @route   POST api/products
// @desc    Create a new product
// @access  Private (Admin only)
router.post(
    '/',
    [
        auth,
        [
            body('name', 'Name is required').not().isEmpty(),
            body('price', 'Price must be a positive number').isFloat({ min: 0 }),
            body('category', 'Category is required').not().isEmpty()
        ]
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', errors: errors.array() });
        }

        const { name, category, description, usage, benefits, price, image } = req.body;

        try {
            const newProduct = await Product.create({
                name,
                category,
                description,
                usage,
                benefits,
                price,
                image,
            });

            res.status(201).json(newProduct);
        } catch (err) {
            next(err);
        }
    }
);

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
    const { name, category, description, usage, benefits, price, image } = req.body;

    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        product.name = name || product.name;
        product.category = category || product.category;
        product.description = description || product.description;
        product.usage = usage || product.usage;
        product.benefits = benefits || product.benefits;
        product.price = price || product.price;
        product.image = image || product.image;

        await product.save();
        res.json(product);
    } catch (err) {
        next(err);
    }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        await product.destroy();
        res.json({ msg: 'Product removed' });
    } catch (err) {
        next(err);
    }
});

// @route   POST api/products/seed
// @desc    Seed initial products
// @access  Private (Protected by ADMIN_SECRET)
router.post('/seed', async (req, res) => {
    const { adminSecret, products } = req.body;

    if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: 'Forbidden: Invalid Admin Secret' });
    }

    try {
        await Product.bulkCreate(products);
        res.json({ msg: 'Products seeded successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
