// models/seatModel.js
const pool = require('../config/db');
const logger = require('../utils/logger');

const getAllSeats = async () => {
  const result = await pool.query('SELECT * FROM seats ORDER BY row_number, seat_number');
  return result.rows;
};

const getAvailableSeats = async () => {
  const result = await pool.query('SELECT * FROM seats WHERE reserved = false ORDER BY row_number, seat_number');
  return result.rows;
};

/**
 * Attempt to find 'quantity' adjacent seats in a single row.
 * If we can't find them in a single row, fallback is to pick any available seats from the earliest rows.
 */
const findSeats = async (quantity) => {
  // seats needed to be in one row
  // We'll fetch seats row by row to see if there's a contiguous block of 'quantity'
  for (let row = 1; row <= 11; row++) {
    const { rows } = await pool.query(
      'SELECT * FROM seats WHERE row_number = $1 AND reserved = false ORDER BY seat_number',
      [row]
    );
    if (rows.length < quantity) {
      // Not enough seats in this row, skip
      continue;
    }
    // Check if we can find a contiguous block of 'quantity' seats in this row
    for (let start = 0; start <= rows.length - quantity; start++) {
      let block = rows.slice(start, start + quantity);
      // Check if seat_number is contiguous (simple check: seat_number forms a sequence)
      let contiguous = true;
      for (let i = 0; i < block.length - 1; i++) {
        if (block[i+1].seat_number !== block[i].seat_number + 1) {
          contiguous = false;
          break;
        }
      }
      if (contiguous) {
        // Found a contiguous block
        return block.map(s => s.id);
      }
    }
  }

  // If we reach here, we didn't find a contiguous block in a single row.
  // Fallback: just pick the earliest 'quantity' available seats from all seats.
  const allAvailable = await getAvailableSeats();
  if (allAvailable.length < quantity) {
    return [];
  }
  return allAvailable.slice(0, quantity).map(s => s.id);
};

const reserveSeats = async (seatIds, userId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Reserve each seat
    let results = [];
    for (const seatId of seatIds) {
      let updateRes = await client.query(
        'UPDATE seats SET reserved = true, user_id = $1 WHERE id = $2 AND reserved = false RETURNING *',
        [userId, seatId]
      );
      if (updateRes.rows.length === 0) {
        throw new Error('Some seat is not available anymore.');
      }
      results.push(updateRes.rows[0]);
    }
    await client.query('COMMIT');
    return results;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error reserving seats: ', error.message);
    throw error;
  } finally {
    client.release();
  }
};

const resetSeat = async (seatId, userId) => {
  // Optionally, allow users to "un-reserve" a seat if they are the owner.
  const result = await pool.query(
    `UPDATE seats
     SET reserved = false, user_id = NULL
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [seatId, userId]
  );
  return result.rows[0];
};

module.exports = {
  getAllSeats,
  getAvailableSeats,
  findSeats,
  reserveSeats,
  resetSeat
};
