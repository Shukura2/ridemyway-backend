import Model from '../models/model.js';

const rideHistoryModel = new Model('ride_history');
const rideOffer = new Model('offers');

/**
 * Insert user history into database
 *
 * @param {object} req - request
 *
 * @param {object} res - response
 *
 * @returns {object} user history
 */
export const joinRide = async (req, res) => {
  const offerId = req.params.id;
  const { id } = req.user;
  try {
    const offer = await rideOffer.select('id, "driverId", amount, destination', `
    WHERE id = '${offerId}'`);
    if (offer.rowCount) {
      const {
        id: idOffer, driverId, amount, destination
      } = offer.rows[0];
      const columns = '"driverId", "userId", "offerId", amount, destination, status';
      const values = `'${driverId}', '${id}', '${idOffer}', '${amount}',
      ' ${destination}', 'Pending'`;
      await rideHistoryModel.insertWithReturn(columns, values);
      return res.status(200).json({
        message: 'Ride offer joined'
      });
    }
    return res.status(404).json({
      message: 'There is no offer with this id'
    });
  }
  catch (error) {
    return res.status(400).json({
      message: 'Authentication token is invalid or expired'
    });
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
  try {
    const results = await rideHistoryModel.select('*');
    if (results.rowCount === 0) {
      return res.status(400).json({
        message: 'No history',
        success: false
      });
    }
    return res.status(200).json(
      results.rows
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
