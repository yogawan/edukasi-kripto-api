require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());


// Middleware untuk membaca JSON
app.use(express.json());

// Middleware untuk koneksi ke database
app.use(async (req, res, next) => {
  try {
    req.db = await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).send('Database connection failed');
  }
});

// Routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/balance', balanceRoutes);
app.use('/user', userRoutes);

// Server Listener
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
