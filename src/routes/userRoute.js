import express from 'express';
import { validateCreateUser, isLoggedIn, checkUserDetails } from '../middleware/AuthMiddleware';
import {
  addUsers, editUser, userLogin, usersPage
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', usersPage);
userRouter.get('/users', usersPage);
userRouter.post('/users/register', validateCreateUser, addUsers);
userRouter.post('/users/login', checkUserDetails, userLogin);
userRouter.put('/users/edit/:id', isLoggedIn, editUser);

export default userRouter;
