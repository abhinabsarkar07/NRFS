// services/seatService.js
const { findSeats, reserveSeats, getAllSeats, getAvailableSeats, resetSeat } = require('../models/seatModel');

/**
 * Book seats for the user. 
 * One user can reserve up to 7 seats at a time.
 */
const bookSeats = async (quantity, userId) => {
  if (quantity < 1 || quantity > 7) {
    throw new Error('You can only book between 1 and 7 seats at a time.');
  }
  const seatIds = await findSeats(quantity);
  if (seatIds.length < quantity) {
    throw new Error('Not enough seats available.');
  }
  return await reserveSeats(seatIds, userId);
};

const releaseSeat = async (seatId, userId) => {
  // In case the user wants to cancel
  const seat = await resetSeat(seatId, userId);
  if (!seat) {
    throw new Error('Seat not found or not owned by this user.');
  }
  return seat;
};

const listAllSeats = async () => {
  return await getAllSeats();
};

const listAvailableSeats = async () => {
  return await getAvailableSeats();
};

module.exports = {
  bookSeats,
  releaseSeat,
  listAllSeats,
  listAvailableSeats,
};
