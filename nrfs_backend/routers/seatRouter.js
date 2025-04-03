// routers/seatRouter.js
const express = require('express');
const { getAllSeats, getAvailableSeats, reserveSeats, releaseSeat } = require('../controllers/seatController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticate, getAllSeats);
router.get('/available', authenticate, getAvailableSeats);
router.post('/reserve', authenticate, reserveSeats);
router.post('/release/:seatId', authenticate, releaseSeat);

module.exports = router;
