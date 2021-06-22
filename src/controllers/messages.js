import Model from '../models/model.js';
import jwt from 'jsonwebtoken';

const usersModel = new Model('users');
const secretKey = process.env.SECRET_KEY;
export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('full_name, email, password');
    res.status(200).json({ users: data.rows });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};


//for drivers
const driversModel = new Model('drivers');
export const driversPage = async (req, res) => {
  try {
    const data = await driversModel.select(
      'full_name, email, password'
    );
    res.status(200).json({ drivers: data.rows });
  } catch (err) {
    res.status(200).json({ drivers: err.stack });
  }
};

export const addDrivers = async (req, res) => {
  const { full_name, email, password } = req.body;
  const columns = 'full_name, email, password';
  const values = `'${full_name}', '${email}', '${password}'`;
  try {
    const data = await driversModel.insertWithReturn(columns, values);
    const driver = data.rows[0];
    console.log(driver)
    const token = jwt.sign({ 
      driver,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, secretKey);
    res.status(200).json({
       driver, 
       token, 
       message: "Driver created successfully!"});
  } catch (err) {
    res.status(500).json(err);
  }
};

