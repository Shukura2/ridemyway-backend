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
  const { amount, destination } = req.body;
  const { id } = req.user;
  const columns = '"driverId", amount, destination';
  const values = `'${id}', '${amount}', '${destination}'`;
  try {
    const data = await rideOffer.insertWithReturn(columns, values);
    res.status(201).json({ data: data.rows[0] });
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
  const { id } = req.params;
  try {
    // eslint-disable-next-line no-unused-vars
    const data = await rideOffer.delete(`WHERE "id" = '${id}'`);
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
  const offerId = req.params.id;
  const { id } = req.user;
  try {
    // eslint-disable-next-line no-unused-vars
    const data = await rideOffer.update(req.body, `
    WHERE "id" = '${offerId}' AND "driverId" = '${id}'`);
    res.status(200).json({ message: 'Update successful', success: true });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};

/**
 * Allows driver get all offers
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} all offers
 */
export const allOffers = async (req, res) => {
  try {
    const results = await rideOffer.select('*');
    if (results.rowCount === 0) {
      return res.status(400).json({
        message: 'No offers',
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
