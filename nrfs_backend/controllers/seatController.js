// controllers/seatController.js
const { bookSeats, releaseSeat, listAllSeats, listAvailableSeats } = require('../services/seatService');

exports.getAllSeats = async (req, res, next) => {
  try {
    const seats = await listAllSeats();
    res.status(200).json(seats);
  } catch (err) {
    next(err);
  }
};

exports.getAvailableSeats = async (req, res, next) => {
  try {
    const seats = await listAvailableSeats();
    res.status(200).json(seats);
  } catch (err) {
    next(err);
  }
};

exports.reserveSeats = async (req, res, next) => {
  try {
    const { quantity } = req.body; // how many seats user wants
    const userId = req.user.userId; // from auth
    const reserved = await bookSeats(quantity, userId);
    res.status(200).json({
      message: `${reserved.length} seat(s) reserved successfully.`,
      seats: reserved
    });
  } catch (err) {
    next(err);
  }
};

exports.releaseSeat = async (req, res, next) => {
  try {
    const seatId = parseInt(req.params.seatId, 10);
    const userId = req.user.userId;
    const seat = await releaseSeat(seatId, userId);
    res.status(200).json({
      message: `Seat ID ${seatId} released.`,
      seat
    });
  } catch (err) {
    next(err);
  }
};
