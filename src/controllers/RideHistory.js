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
  const userId = req.user.data.id;
  const columns = '"driverId", "userId", amount, destination, status';
  const values = `'${driverId}', '${userId}', '${amount}', '${destination}', 'Pending' `;
  try {
    const data = await rideHistoryModel.insertWithReturn(columns, values);
    res.status(201).json({ data: data.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};

/**
 * Allow driver delete ride history
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} object
 */
export const deleteHistory = async (req, res) => {
  const driverId = req.user.data.id;
  const { id } = req.params;
  try {
    // eslint-disable-next-line no-unused-vars
    const data = await rideHistoryModel.delete(`
    WHERE "id" = '${id}' AND "driverId" = '${driverId}'`);
    res.status(200).json({ message: 'Ride History deleted', success: true });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};
