import Model from '../models/model.js';
import signToken from '../helperFunctionFile.js';

const driversModel = new Model('drivers');

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
    const { id } = data.rows[0];
    const driver = { id, email: data.rows[0].email };
    const token = signToken(driver);
    return res.status(201).json({
      driver,
      token,
      message: 'Driver created successfully',
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: 'Email already exist',
      success: false
    });
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
      return res.status(400).json({
        message: 'Account with email address does not exists',
        success: false
      });
    }

    const { id } = emailExists.rows[0];
    const driver = { id, email };
    const token = signToken(driver);
    return res.status(201).json({
      driver,
      token,
      message: 'Driver logged in successfully',
      success: true
    });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};

/**
 * Allow driver edit name
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} response object
 */
export const editDriver = async (req, res) => {
  const { id } = req.user;
  try {
    // eslint-disable-next-line no-unused-vars
    const data = await driversModel.update(req.body, `WHERE "id" = '${id}'`);
    return res.status(200).json({ message: 'Edit completed', success: true });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};
