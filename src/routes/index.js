import express from 'express';
import { usersPage, driversPage, addDrivers } from '../controllers/messages.js';
import { validateCreateUser, validateCreateDriver, isLoggedIn } from '../middleware/AuthMiddleware.js';
import { checkUserDetails, checkDriverDetails } from '../middleware/AuthMiddleware.js';
import { addUsers, deleteUser, editUser, userLogin } from '../controllers/userController.js';
import {usersHistory, addUsersHistory} from '../controllers/RideHistory.js';
import { deleteOffer, updateOffer } from '../controllers/offers.js';


const indexRouter = express.Router();

indexRouter.get('/', usersPage);
indexRouter.get('/users', usersPage);
indexRouter.post('/users/register', validateCreateUser, addUsers);
indexRouter.post('/users/login', userLogin);
indexRouter.delete('/users/delete/:id', isLoggedIn, deleteUser);
indexRouter.put('/users/edit/:id', isLoggedIn, editUser);


indexRouter.get('/', driversPage);
indexRouter.get('/drivers', driversPage);
indexRouter.post('/drivers/register', validateCreateDriver, addDrivers);
indexRouter.post('/drivers/login', checkDriverDetails);

indexRouter.get('/', usersHistory);
indexRouter.get('/user/ride-history', isLoggedIn, usersHistory);
indexRouter.get('/driver/ride-history', isLoggedIn);
indexRouter.get('/user/ride-history', isLoggedIn);
indexRouter.post('/ride-history', addUsersHistory);

indexRouter.delete('/offer/delete/:id', isLoggedIn, deleteOffer);
indexRouter.put('/offer/update/:id', isLoggedIn, updateOffer);


export default indexRouter;
