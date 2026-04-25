const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { sendEmail } = require('../utils/email');

// @route   POST api/orders
// @desc    Place a new order
// @access  Public
router.post(
    '/',
    [
        body('customerName', 'Name is required').not().isEmpty(),
        body('customerEmail', 'Valid email is required').isEmail(),
        body('customerPhone', 'Phone is required').not().isEmpty(),
        body('shippingAddress', 'Shipping address is required').not().isEmpty(),
        body('items', 'Order must contain items').isArray({ min: 1 })
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', errors: errors.array() });
        }

        const { customerName, customerEmail, customerPhone, shippingAddress, items } = req.body;

        try {
            // First, calculate total and verify products
            let totalAmount = 0;
            const processedItems = [];

            for (const item of items) {
                const product = await Product.findByPk(item.productId);
                if (!product) {
                    return res.status(400).json({ message: `Product ${item.productId} not found` });
                }
                const price = product.price;
                totalAmount += price * item.quantity;
                
                processedItems.push({
                    productId: product.id,
                    quantity: item.quantity,
                    priceAtPurchase: price
                });
            }

            // Calculate Estimated Delivery Date (5 days from now)
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 5);

            // Create Order
            const newOrder = await Order.create({
                customerName,
                customerEmail,
                customerPhone,
                shippingAddress,
                totalAmount,
                paymentMethod: 'COD',
                paymentStatus: 'Pending',
                deliveryStatus: 'Processing',
                estimatedDeliveryDate: deliveryDate
            });

            // Add OrderItems
            for (const pItem of processedItems) {
                await OrderItem.create({
                    orderId: newOrder.id,
                    productId: pItem.productId,
                    quantity: pItem.quantity,
                    priceAtPurchase: pItem.priceAtPurchase
                });
            }

            // Trigger Email Notification to Customer
            try {
                await sendEmail(
                    customerEmail,
                    'Order Confirmation & Tracking - Sagar Raj Green',
                    `Thank you for your order! Your order ID is ${newOrder.id}. We expect to deliver it by ${deliveryDate.toLocaleDateString()}. Track it at any time on our website.`,
                    `<h2>Thank you for your order!</h2>
                     <p>Your order ID is: <strong style="font-size:1.2em;color:#059669;">${newOrder.id}</strong>.</p>
                     <p>Total amount: <strong>₹${totalAmount}</strong></p>
                     <p>Estimated Delivery: <strong>${deliveryDate.toLocaleDateString()}</strong></p>
                     <p>You can track the live status of your order by visiting our website and entering your Order ID and Email.</p>
                     <p>- The Sagar Raj Green Team</p>`
                );
            } catch (emailErr) {
                console.error("Failed to send order email, but order was placed:", emailErr);
            }

            res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.id, estimatedDeliveryDate: deliveryDate });

        } catch (err) {
            next(err);
        }
    }
);

// @route   GET api/orders
// @desc    Get all orders
// @access  Private (Admin only)
router.get('/', auth, async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            include: [{
                model: OrderItem,
                as: 'items',
                include: [Product]
            }],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (err) {
        next(err);
    }
});

// @route   PUT api/orders/:id
// @desc    Update order delivery/payment status
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res, next) => {
    const { deliveryStatus, paymentStatus } = req.body;
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (deliveryStatus) order.deliveryStatus = deliveryStatus;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        await order.save();
        res.json(order);
    } catch (err) {
        next(err);
    }
});

// @route   POST api/orders/track
// @desc    Track order as a guest
// @access  Public
router.post(
    '/track',
    [
        body('orderId', 'Order ID is required').not().isEmpty(),
        body('email', 'Valid email is required').isEmail()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', errors: errors.array() });
        }

        const { orderId, email } = req.body;

        try {
            const order = await Order.findOne({
                where: {
                    id: orderId,
                    customerEmail: email
                },
                include: [{
                    model: OrderItem,
                    as: 'items',
                    include: [Product]
                }]
            });

            if (!order) {
                return res.status(404).json({ message: 'No matching order found with this ID and Email combination.' });
            }

            res.json(order);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
