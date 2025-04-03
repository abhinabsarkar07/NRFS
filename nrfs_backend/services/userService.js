// services/userService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, findUserById } = require('../models/userModel');
const { JWT_SECRET } = require('../config/config');

const registerUser = async (email, password) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser(email, hashedPassword);
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid credentials');
  }
  // Create JWT
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
  return { token, user };
};

module.exports = {
  registerUser,
  loginUser,
};
