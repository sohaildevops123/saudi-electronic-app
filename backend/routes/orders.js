const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// POST /api/orders - Submit product cart order or software service booking
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const { customer_name, customer_phone, city, order_type, total_amount, items, notes } = req.body;

    if (!customer_name || !customer_phone || !total_amount) {
      return res.status(400).json({ success: false, message: 'Missing required customer details' });
    }

    await client.query('BEGIN');

    const orderResult = await client.query(
      `INSERT INTO orders (customer_name, customer_phone, city, order_type, total_amount, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [customer_name, customer_phone, city || 'Riyadh', order_type || 'PRODUCT', total_amount, notes || '']
    );

    const newOrder = orderResult.rows[0];

    // If order type is product and items are provided
    if (order_type === 'PRODUCT' && Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
           VALUES ($1, $2, $3, $4)`,
          [newOrder.id, item.product_id || item.id, item.quantity, item.price]
        );
      }
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error placing order:', err);
    res.status(500).json({ success: false, error: 'Failed to process order' });
  } finally {
    client.release();
  }
});

// GET /api/orders - List all orders (Admin overview)
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

module.exports = router;
