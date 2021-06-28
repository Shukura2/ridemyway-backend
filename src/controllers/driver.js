import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Model from '../models/model.js';

const driversModel = new Model('drivers');
const secretKey = process.env.SECRET_KEY;
/**
 * @description Take driver signup details
 *
 * @param {object} req - response
 *
 * @param {object} res - response
 *
 * @returns {object} driver detals
 */
export const driversPage = async (req, res) => {
  try {
    const data = await driversModel.select(
      '"fullName", email, password'
    );
    res.status(200).json({ drivers: data.rows });
  } catch (err) {
    res.status(200).json({ drivers: err.stack });
  }
};

/**
 * Add the driver details to database
 *
 * @param {object} req - request
 *
 * @param {object} res - response
 *
 * @returns {object} driver details added
 */
export const addDrivers = async (req, res) => {
  const { fullName, email, password } = req.body;
  const columns = '"fullName", email, password';
  const values = `'${fullName}', '${email}', '${password}'`;
  try {
    const data = await driversModel.insertWithReturn(columns, values);
    const driver = data.rows[0];
    const token = jwt.sign({
      driver,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, secretKey);
    return res.status(200).json({
      driver,
      token,
      message: 'Driver created successfully!'
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

/**
 *  @description - Driver login
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @return {Object}  - Returns Driver
 */
export const driverLogin = async (req, res) => {
  const { email } = req.body;
  try {
    const emailExists = await
    driversModel.select('id, email, password', `WHERE "email" = '${email}'`);
    if (emailExists.rowCount === 0) {
      return res.status(400).send({
        message: 'Invalid Email',
        status: false
      });
    }

    const driver = emailExists.rows[0];
    const token = jwt.sign({
      driver,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, secretKey);
    res.status(200).json({
      driver,
      token,
      message: 'Driver login successfully!'
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
