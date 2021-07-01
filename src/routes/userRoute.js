import express from 'express';
import { validateCreateUser, isLoggedIn, checkUserDetails } from '../middleware/AuthMiddleware';
import {
  addUsers, editUser, userLogin
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/users/register', validateCreateUser, addUsers);
userRouter.post('/users/login', checkUserDetails, userLogin);
userRouter.put('/users/edit/:id', isLoggedIn, editUser);

export default userRouter;
