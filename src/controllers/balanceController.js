const { ObjectId } = require('mongodb');
const Transaction = require('../models/transactionModel');

const buyCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.userId;

    if (!courseId) return res.status(400).send('Course ID is required');

    const user = await req.db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).send('User not found');

    const course = await req.db.collection('courses').findOne({ _id: new ObjectId(courseId) });
    if (!course) return res.status(404).send('Course not found');

    if (user.balance < course.price) {
      return res.status(400).send('Insufficient balance');
    }

    const updatedBalance = user.balance - course.price;

    await req.db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { balance: updatedBalance } }
    );

    const newTransaction = new Transaction({
      userId: userId,
      courseId: courseId,
      courseTitle: course.title,
      price: course.price,
    });

    await req.db.collection('transactions').insertOne(newTransaction);

    res.json({
      message: 'Course purchased successfully',
      remainingBalance: updatedBalance,
    });
  } catch (error) {
    console.error('Error buying course:', error.message);
    res.status(500).send('Failed to buy course');
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const transactions = await req.db.collection('transactions').find({ userId }).toArray();
    res.json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error.message);
    res.status(500).send('Failed to retrieve transactions');
  }
};

module.exports = { buyCourse, getTransactions };