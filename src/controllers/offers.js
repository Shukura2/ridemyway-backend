import Model from '../models/model.js';

const rideOffer = new Model('offers');
/**
 * Collect the offers request information
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} offers information
 */
export const offersRequest = async (req, res) => {
  try {
    const data = await rideOffer.select('"driverId", amount, "dateTime", destination');
    res.status(200).json({ error: data.rows });
  } catch (err) {
    res.status(200).json({ error: err.stack });
  }
};

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
    res.status(200).json(data.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * Allow user delete offers
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} object
 */
export const deleteOffer = async (req, res) => {
  const driverId = req.user.driver.id;
  const { id } = req.params.id;
  try {
    const data = await rideOffer.delete(`WHERE "id" = '${id}' AND "driverId" = '${driverId}'`);
    res.status(200).json({ error: data.rows });
  } catch (err) {
    res.status(200).json({ error: err.stack });
  }
};

/**
 * Allows user update offer
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} updated offer
 */
export const updateOffer = async (req, res) => {
  const driverId = req.user.driver.id;
  const { id } = req.params.id;
  try {
    const data = await
    rideOffer.update(req.body, `WHERE "id" = '${id}' AND "driverId" = '${driverId}'`);
    res.status(200).json({ error: data.rows });
  } catch (err) {
    res.status(200).json({ error: err.stack });
  }
};
