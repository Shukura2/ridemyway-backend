import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

/**
 * Helper function
 *
 * @param {object} data object
 *
 * @returns {object} object
 */
const signToken = (data) => {
  const token = jwt.sign({
    data,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  }, secretKey);
  return token;
};

export default signToken;
