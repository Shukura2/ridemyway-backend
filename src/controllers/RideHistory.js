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
    driverId, userId, amount, destination
  } = req.body;
  const columns = '"driverId", "userId", amount, destination';
  const values = `'${driverId}', '${userId}', '${amount}', '${destination}'`;
  try {
    const data = await rideHistoryModel.insertWithReturn(columns, values);
    res.status(200).json({data: data.rows[0]});
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};
