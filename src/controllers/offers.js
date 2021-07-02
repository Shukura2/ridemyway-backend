import Model from '../models/model.js';

const rideOffer = new Model('offers');

/**
 * Insert informations to the table
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} offers
 */
export const addUsersOffers = async (req, res) => {
  const {
    driverId, amount, destination
  } = req.body;
  const columns = '"driverId", amount, destination';
  const values = `'${driverId}', '${amount}', '${destination}'`;
  try {
    const data = await rideOffer.insertWithReturn(columns, values);
    res.status(200).json({ data: data.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};

/**
 * Allow driver delete offers
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} object
 */
export const deleteOffer = async (req, res) => {
  const driverId = req.user.data.id;
  const { id } = req.params;
  try {
    // eslint-disable-next-line no-unused-vars
    const data = await rideOffer.delete(`WHERE "id" = '${id}' AND "driverId" = '${driverId}'`);
    res.status(200).json({ message: 'Offer deleted', success: true });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};

/**
 * Allows driver update offer
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} updated offer
 */
export const updateOffer = async (req, res) => {
  const driverId = req.user.data.id;
  const { id } = req.params;
  try {
    // eslint-disable-next-line no-unused-vars
    const data = await rideOffer.updateColumn(req.body, `
    WHERE "id" = '${id}' AND "driverId" = '${driverId}'`);
    res.status(200).json({ message: 'Update successful', success: true });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};
