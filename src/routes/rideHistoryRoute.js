import express from 'express';
import { allHistory, joinRide } from '../controllers/RideHistory';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const rideHistoryRouter = express.Router();

rideHistoryRouter.post('/join/ride/:id', isLoggedIn, joinRide);
rideHistoryRouter.get('/all-history', allHistory);

export default rideHistoryRouter;
