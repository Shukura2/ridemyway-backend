import Model from '../models/model';
import signToken from '../helperFunctionFile';

const userModel = new Model('users');

/**
 * Add user model template
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} user template
 */
export const usersPage = async (req, res) => {
  try {
    const data = await userModel.select('"fullName", email, password');
    res.status(200).json({ user: data.rows });
  } catch (err) {
    res.status(200).json({ user: err.stack });
  }
};

/**
 * Add user information to database
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} user inputed data
 */
export const addUsers = async (req, res) => {
  const {
    fullName, email, password
  } = req.body;
  const columns = '"fullName", email, password';
  const values = `'${fullName}', '${email}', '${password}'`;
  try {
    const data = await userModel.insertWithReturn(columns, values);

    const user = data.rows[0];
    const token = signToken(user);
    res.status(200).json({
      user,
      token,
      message: 'User created successfully!',
      success: true
    });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};

/**
 * Allow users edit name
 *
 * @param {object} req request
 *
 * @param {object} res response
 *
 * @returns {object} name edited
 */
export const editUser = async (req, res) => {
  const { id } = req.user.data;
  try {
    // eslint-disable-next-line no-unused-vars
    const data = await userModel.updateColumn(req.body, `WHERE "id" = '${id}'`);
    res.status(200).json({ message: 'Edit completed', success: true });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};

/**
 * Add login token
 *
 * @param {object} req - request
 *
 * @param {object} res - response
 *
 * @returns {object} token
 */
export const userLogin = async (req, res) => {
  const { email } = req.body;
  try {
    const emailExists = await userModel.select('id, email, password', `WHERE "email" = '${email}'`);
    if (emailExists.rowCount === 0) {
      return res.status(400).send({
        message: 'Invalid Email',
        success: false
      });
    }

    const user = emailExists.rows[0];
    const token = signToken(user);
    res.status(200).json({
      user,
      token,
      message: 'User login successfully!',
      success: true
    });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};
