const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/services - Get software solutions list
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM services ORDER BY id ASC');
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ success: false, error: 'Database query failed' });
  }
});

module.exports = router;
