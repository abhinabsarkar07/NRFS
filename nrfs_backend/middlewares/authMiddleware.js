// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId: ... }
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;
