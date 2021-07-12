import Model from '../models/model.js';

const rideHistoryModel = new Model('ride_history');

/**
 * Insert user history into database
 *
 * @param {object} req - request
 *
 * @param {object} res - response
 *
 * @returns {object} user history
 */
export const addUsersHistory = async (req, res) => {
  const {
    driverId, amount, destination
  } = req.body;
  const { id } = req.user;
  const columns = '"driverId", "userId", amount, destination, status';
  const values = `'${driverId}', '${id}', '${amount}', '${destination}', 'Pending' `;
  try {
    const data = await rideHistoryModel.insertWithReturn(columns, values);
    res.status(201).json({ data: data.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};

/**
 * Allows user get all ride history
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} all offers
 */
export const allHistory = async (req, res) => {
  const results = await rideHistoryModel.select('*');
  if (results.rowCount === 0) {
    return res.status(200).send(
      results.rows
    );
  }
  return res.status(200).send(
    results.rows
  );
};
