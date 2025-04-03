// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT } = require('./config/config');
const userRouter = require('./routers/userRouter');
const seatRouter = require('./routers/seatRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test DB connection
pool.query('SELECT NOW()')
  .then(() => console.log('Successfully connected to PostgreSQL.'))
  .catch((err) => console.error('DB connection error:', err));

// Routes
app.use('/api/users', userRouter);       
app.use('/api/seats', seatRouter);       

// Error handling
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
