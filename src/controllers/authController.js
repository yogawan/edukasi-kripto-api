const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const result = await req.db.collection('users').insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    res.status(500).send('Registration failed');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await req.db.collection('users').findOne({ email });
    if (!user) return res.status(401).send('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid email or password');

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).send('Login failed');
  }
};

module.exports = { register, login };