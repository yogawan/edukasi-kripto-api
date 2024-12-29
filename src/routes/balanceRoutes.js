const express = require('express');
const { buyCourse, getTransactions } = require('../controllers/balanceController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/buy', verifyToken, buyCourse);
router.get('/transactions', verifyToken, getTransactions);

module.exports = router;
