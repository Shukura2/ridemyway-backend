import express from 'express';
import { addUsersHistory } from '../controllers/RideHistory';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const rideHistoryRouter = express.Router();

rideHistoryRouter.post('/offer/request', isLoggedIn, addUsersHistory);

export default rideHistoryRouter;
