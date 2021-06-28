import express from 'express';

import {
  validateCreateUser,
  isLoggedIn,
  checkUserDetails
} from '../middleware/AuthMiddleware';

import {
  addUsers,
  deleteUser,
  editUser,
  userLogin,
  usersPage
} from '../controllers/userController';

const indexRouter = express.Router();

indexRouter.get('/', usersPage);
indexRouter.get('/users', usersPage);
indexRouter.post('/users/register', validateCreateUser, addUsers);
indexRouter.post('/users/login', checkUserDetails, userLogin);
indexRouter.delete('/users/delete/:id', isLoggedIn, deleteUser);
indexRouter.put('/users/edit/:id', isLoggedIn, editUser);

export default indexRouter;
