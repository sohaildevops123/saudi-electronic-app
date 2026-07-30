const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db');
const productsRoutes = require('./routes/products');
const servicesRoutes = require('./routes/services');
const ordersRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck Route
app.get('/api/health', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.json({
      status: 'HEALTHY',
      service: 'Saudi Electronics API',
      timestamp: dbRes.rows[0].now,
      database: 'Connected',
    });
  } catch (err) {
    res.status(500).json({
      status: 'UNHEALTHY',
      database: 'Disconnected',
      error: err.message,
    });
  }
});

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/orders', ordersRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Saudi Electronics & Software Solutions API is active');
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});
