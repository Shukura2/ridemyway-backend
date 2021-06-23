import Model from '../models/model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const userModel = new Model('users');
const secretKey = process.env.SECRET_KEY;
export const addUsers = async (req, res) => {
  const {
    full_name, email, password
  } = req.body;
  console.log(req.body);
  const columns = 'full_name, email, password';
  const values = `'${full_name}', '${email}', '${password}'`;
  try {
    const data = await userModel.insertWithReturn(columns, values);
    const user = data.rows[0];
    console.log(user)
    const token = jwt.sign({
      user,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, secretKey);
    res.status(200).json({
       user, 
       token, 
       message: "User created successfully!"});
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  console.log(req.user)
  const id = req.params.id
    try {
      const data = await userModel.delete(`WHERE "id" = '${id}'`);
      res.status(200).json({ delete: data.rows });
    } catch (err) {
      res.status(200).json({ delete: err.stack });
    }
};

export const editUser = async (req, res) => {
  console.log(req.user)
  const id = req.params.id
    try {
      const data = await userModel.update(req.body, `WHERE "id" = '${id}'`);
      res.status(200).json({ update: data.rows });
    } catch (err) {
      res.status(200).json({ update: err.stack });
    }
};

//token login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  // const columns = 'email, password';
  // const values = `'${email}', '${password}'`;
  try {
    const emailExists = await userModel.select('id, email, password', `WHERE "email" = '${email}'`);
    // console.log(emailExists)
     if(emailExists.rowCount === 0){
      return res.status(400).send({
        message: "Invalid Email",
        status: false
      })
    }
    const passwordIsValid = await bcrypt.compare(password, emailExists.rows[0].password)
    console.log(passwordIsValid)
    if(!passwordIsValid) return res.status(400).send({message: 'invalid password'})
    const user = emailExists.rows[0];
    
    const token = jwt.sign({
      user,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, secretKey);
    res.status(200).json({
        user,
       token, 
       message: "User login successfully!"});
  } catch (err) {
    res.status(500).json(err);
  }
};