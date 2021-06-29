import Model from '../models/model.js';

const rideHistoryModel = new Model('ride_history');
/**
 * Add information with the template
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {void} ride history
 */
export const usersHistory = async (req, res) => {
  const { id } = req.user.usersHistory;
  try {
    const data = await rideHistoryModel.select(
      '"driverId", "userId", amount, "dateOfTrip", destination', `WHERE "user_id" = '${id}'`
    );
    res.status(200).json({ error: data.rows });
  } catch (err) {
    res.status(200).json({ error: err.stack });
  }
};

/**
 * Insert into user history
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
    res.status(200).json(data.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};
