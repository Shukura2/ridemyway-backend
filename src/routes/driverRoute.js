import express from 'express';
import {
  addDrivers, driverLogin, driversPage, editDriver
} from '../controllers/driver';
import { checkDriverDetails, isLoggedIn, validateCreateDriver } from '../middleware/AuthMiddleware';

const driverRouter = express.Router();

driverRouter.get('/', driversPage);
driverRouter.get('/drivers', driversPage);
driverRouter.post('/drivers/register', validateCreateDriver, addDrivers);
driverRouter.post('/drivers/login', checkDriverDetails, driverLogin);
driverRouter.put('/drivers/edit/:id', isLoggedIn, editDriver);

export default driverRouter;