const express = require('express');
const router = express.Router();
const Orders = require('../model/orders');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Orders.fetchAll();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific order by id
router.get('/:id', getOrder, (req, res) => {
    res.json(res.order);
});

// Create a new order
router.post('/new', async (req, res) => {
    const order = new Orders({
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        price: req.body.price
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a specific order by id
router.patch('update/:id', getOrder, async (req, res) => {
    if (req.body.user_id != null) {
        res.order.user_id = req.body.user_id;
    }
    if (req.body.product_id != null) {
        res.order.product_id = req.body.product_id;
    }
    if (req.body.price != null) {
        res.order.price = req.body.price;
    }

    try {
        const updatedOrder = await res.order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a specific order by id
router.delete('delete/:id', getOrder, async (req, res) => {
    try {
        await res.order.destroy();
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get order by id
async function getOrder(req, res, next) {
    let order;
    try {
        order = await Orders.where({ id: req.params.id }).fetch();
        if (order == null) {
            return res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.order = order;
    next();
}

module.exports = router;
