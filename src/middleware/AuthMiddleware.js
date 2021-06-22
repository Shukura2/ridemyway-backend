import Joi from 'joi';
import bcrypt from 'bcrypt';
import Model from '../models/model.js';
import jwt from 'jsonwebtoken'
import { pool } from '../models/pool.js';

//signup drivers...
const userModel = new Model('users');
const secretKey = process.env.SECRET_KEY;

//validate informations before store in db
  export const validateCreateUser = async (req, res, next) => {
  const userSchema = {
    full_name: Joi.string().required(),
    email: Joi.string().max(50).required(),
    password: Joi.string().min(10).required()
  };

  const { error } = Joi.validate(req.body, userSchema);
  if (error) {
    return res.status(400).send(error.details);
  }

  //collect informations from the db, hash the password, check email  
  const {full_name, email, password} = req.body
  req.body.password = await bcrypt.hash(password, 10);
  const emailExists = await userModel.select('*', `WHERE "email" = '${email}'`);
  if(emailExists.rowCount){
    return res.status(400).send({
      message: "Email already exists",
      status: false
    })
  }

  return next();
};

//login.............

export const checkUserDetails = async(req, res, next) => {

  const { email, password} = req.body;
  try {
    const emailExists = await userModel.select('*', `WHERE "email" = '${email}'`);
     if(emailExists.rowCount ===0){
      return res.status(400).send({
        message: "Invalid Email",
        status: false
      })
    }
    const passwordIsValid = await bcrypt.compare(password, emailExists.rows[0].password)
    if(!passwordIsValid) return res.status(400).send({message: 'invalid password'})
    // return res.status(200).send({message: 'Logged In', status: 'Success'})
    return next();
    
  } catch (error) {
    console.log(error.message)
  }
}

////drivers sign up
//signup drivers...
const driversModel = new Model('drivers');

//validate informations before store in db
  export const validateCreateDriver = async (req, res, next) => {
  const userSchema = {
    full_name: Joi.string().required(),
    email: Joi.string().max(50).required(),
    password: Joi.string().min(10).required()
  };

  const { error } = Joi.validate(req.body, userSchema);
  if (error) {
    return res.status(400).send(error.details);
  }

  //collect informations from the db, hash the password, check email  
  const {full_name, email, password} = req.body
  req.body.password = await bcrypt.hash(password, 10);
  const emailExists = await userModel.select('*', `WHERE "email" = '${email}'`);
  if(emailExists.rowCount){
    return res.status(400).send({
      message: "Email already exists",
      status: false
    })
  }

  return next();
};

///login drivers
export const checkDriverDetails = async(req, res, next) => {

  const { email, password} = req.body;
  try {
    const emailExists = await driversModel.select('*', `WHERE "email" = '${email}'`);
     if(emailExists.rowCount ===0){
      return res.status(400).send({
        message: "Invalid Email",
        status: false
      })
    }
    const passwordIsValid = await bcrypt.compare(password, emailExists.rows[0].password)
    if(!passwordIsValid) return res.status(400).send({message: 'invalid password'})
    const {id} = emailExists.rows[0]
    const driver = {id}
    const token = jwt.sign({
      driver,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, secretKey);
    res.status(200).json({
      driver,
       token, 
       message: "Driver login successfully!"});
  } catch (err) {
    res.status(500).json(err);
  }

    
    

}


//view one ridehistory
export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  let tokenValue;
  try {
    if(token){
      tokenValue = token.split(" ")[1];
     const userData = jwt.verify(tokenValue, secretKey);
     if(userData){
       req.user = userData;
       next();
     } else {
      res.status(401).send({
        status: false,
        message: "Authentication token is invalid or expired"
      })
     }
   } else {
     res.status(401).send({
       status: false,
       message: "Authentication token does not exist"
     })
   }
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: false,
      message: "Authentication token is invalid or expired"
    })
  }
  console.log(token);
}
