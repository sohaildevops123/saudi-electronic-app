const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/products - Get all products with optional category, search, and sorting
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    
    let query = `
      SELECT p.*, c.name_en as category_name_en, c.name_ar as category_name_ar, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== 'all') {
      params.push(category);
      query += ` AND c.slug = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (p.name_en ILIKE $${params.length} OR p.name_ar ILIKE $${params.length} OR p.brand ILIKE $${params.length})`;
    }

    if (sort === 'price-low') {
      query += ` ORDER BY p.price ASC`;
    } else if (sort === 'price-high') {
      query += ` ORDER BY p.price DESC`;
    } else {
      query += ` ORDER BY p.id ASC`;
    }

    const { rows } = await pool.query(query, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

// GET /api/products/categories - Get all categories
router.get('/categories', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY id ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT p.*, c.name_en as category_name_en, c.name_ar as category_name_ar, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

module.exports = router;
