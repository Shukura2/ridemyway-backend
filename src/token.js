// import jwt from 'jsonwebtoken';
// import Model from './models/model';

// const secretKey = process.env.SECRET_KEY;
// /**
//  * Helper function for the token
//  *
//  * @return {object} object
//  */
// const token = () => {
//   jwt.sign({
//     user,
//     exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
//   }, secretKey);
//   res.status(200).json({
//     user,
//     token,
//     message: 'User created successfully!'
//   });
// };

// const userModel = new Model('users');
// const data = userModel.insertWithReturn(columns, values);
// const user = data.rows[0];
// const columns = '"fullName", email, password';
// const values = `'${fullName}', '${email}', '${password}'`;

// const {
//   fullName, email, password
// } = req.body;

// export default token;
