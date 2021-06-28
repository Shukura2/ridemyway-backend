import express from 'express';
import { addDrivers, driverLogin, driversPage } from '../controllers/driver';
import { checkDriverDetails, validateCreateDriver } from '../middleware/AuthMiddleware';

const driverRouter = express.Router();

driverRouter.get('/', driversPage);
driverRouter.get('/drivers', driversPage);
driverRouter.post('/drivers/register', validateCreateDriver, addDrivers);
driverRouter.post('/drivers/login', checkDriverDetails, driverLogin);

export default driverRouter;
