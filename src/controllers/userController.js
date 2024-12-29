const { ObjectId } = require('mongodb');

// Controller untuk melihat profil pengguna
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await req.db.collection('users').findOne(
      { _id: new ObjectId(userId) },
      { projection: { name: 1, email: 1, balance: 1, createdAt: 1 } }
    );

    if (!user) return res.status(404).send('User not found');

    res.json({
      name: user.name,
      email: user.email,
      balance: user.balance,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error retrieving profile:', error.message);
    res.status(500).send('Failed to retrieve profile');
  }
};

module.exports = { getProfile };
