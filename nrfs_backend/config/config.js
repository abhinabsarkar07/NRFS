// config/config.js
require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
  PORT: process.env.PORT || 5000,
};
