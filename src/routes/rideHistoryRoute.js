import express from 'express';
import { addUsersHistory } from '../controllers/RideHistory';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const rideHistoryRouter = express.Router();

rideHistoryRouter.get('/driver/ride-history', isLoggedIn);
rideHistoryRouter.get('/user/ride-history', isLoggedIn);
rideHistoryRouter.post('/ride-history', addUsersHistory);

export default rideHistoryRouter;
