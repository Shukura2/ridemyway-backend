import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Model from '../models/model';

const userModel = new Model('users');
const secretKey = process.env.SECRET_KEY;

/**
 * @description - middleware for validating user signup input
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @param {Object} next - middleware
 *
 * @return {Object}  - Returns object containing user information
 */
export const validateCreateUser = async (req, res, next) => {
  const userSchema = {
    fullName: Joi.string().required(),
    email: Joi.string().email().max(256).required(),
    password: Joi.string().min(10).required()
  };

  const { error } = Joi.validate(req.body, userSchema);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  const { email, password } = req.body;
  const emailExists = await userModel.select('*', `WHERE "email" = '${email}'`);
  if (emailExists.rowCount) {
    return res.status(409).json({
      message: 'Account with the email address already exists',
      success: false
    });
  }
  req.body.password = await bcrypt.hash(password, 10);
  return next();
};

/**
 *  @description - middleware for validating user login details
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @param {Object} next - middleware
 *
 * @return {Object}  - Returns object containing user information
 */
export const checkUserDetails = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailExists = await userModel.select('*', `WHERE "email" = '${email}'`);
    if (emailExists.rowCount === 0) {
      return res.status(400).json({
        message: 'Account with email address does not exists',
        success: false
      });
    }
    const passwordIsValid = await bcrypt.compare(password, emailExists.rows[0].password);
    if (!passwordIsValid) {
      return res.status(400).send({
        message: 'Email or password is invalid',
        success: false
      });
    }
    return next();
  } catch (error) {
    return res.status(400).json({
      message: 'Password is invalid',
      success: false
    });
  }
};

const driversModel = new Model('drivers');

/**
 *  @description - middleware for validating driver signin
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @param {Object} next - middleware
 *
 * @return {Object}  - Returns object containing driver information
 */
export const validateCreateDriver = async (req, res, next) => {
  const driverSchema = {
    fullName: Joi.string().required(),
    email: Joi.string().email().max(256).required(),
    password: Joi.string().min(10).required()
  };
  const { error } = Joi.validate(req.body, driverSchema);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  const { email, password } = req.body;
  const emailExists = await userModel.select('*', `WHERE "email" = '${email}'`);
  if (emailExists.rowCount) {
    res.status(409).json({
      message: 'Account with the email address already exists',
      success: false
    });
  }
  req.body.password = await bcrypt.hash(password, 10);
  return next();
};

/**
 *  @description - middleware for validating driver login
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @param {Object} next - middleware
 *
 * @return {Object}  - Returns object containing driver information
 */
export const checkDriverDetails = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailExist = await driversModel.select('*', `WHERE "email" = '${email}'`);
    if (emailExist.rowCount === 0) {
      return res.status(409).send({
        message: 'Account with the email address already exists',
        success: false
      });
    }
    const passwordValid = await bcrypt.compare(password, emailExist.rows[0].password);
    if (!passwordValid) {
      return res.status(400).send({
        message: 'Email or password is invalid',
        success: false
      });
    }
    return next();
  } catch (error) {
    res.status(400).json({
      message: 'Password is invalid',
      success: false
    });
  }
};

/**
 *  @description - middleware for validating ride history for one user
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 * @param {Object} next - callback
 *
 * @return {Object}  - Returns object containing individual ride histroy
 */
export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  let tokenValue;
  try {
    if (token) {
      [, tokenValue] = token.split(' ');
      const userData = jwt.verify(tokenValue, secretKey);
      if (userData) {
        req.user = userData;
        next();
      } else {
        res.status(400).json({
          success: false,
          message: 'Authentication token is invalid or expired'
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Authentication token does not exist'
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Authentication token is invalid or expired',
    });
  }
};
