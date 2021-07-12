import Model from '../models/model';
import signToken from '../helperFunctionFile';

const userModel = new Model('users');

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
    const { id } = data.rows[0];
    const user = { id, email: data.rows[0].email };
    const token = signToken(user);
    return res.status(201).json({
      user,
      token,
      message: 'User created successfully!',
      success: true
    });
  } catch (err) {
    res.status(500).json({
      messsage: 'Email already exist',
      success: false
    });
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
  const { id } = req.user;
  try {
    // eslint-disable-next-line no-unused-vars
    const data = await userModel.update(req.body, `WHERE "id" = '${id}'`);
    return res.status(200).json({ message: 'Edit completed', success: true });
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
    const { id } = emailExists.rows[0];
    const user = { id, email };
    const token = signToken(user);
    return res.status(200).json({
      user,
      token,
      message: 'User login successfully!',
      success: true
    });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
};
