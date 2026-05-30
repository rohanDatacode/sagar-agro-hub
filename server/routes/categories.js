const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// GET all categories
router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        next(err);
    }
});

// POST new category
router.post('/', auth, async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const category = await Category.create({ name, description });
        res.status(201).json(category);
    } catch (err) {
        next(err);
    }
});

// DELETE category
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        await category.destroy();
        res.json({ message: 'Category removed' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
