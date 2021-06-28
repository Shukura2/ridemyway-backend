import express from 'express';
import { addUsersHistory, usersHistory } from '../controllers/RideHistory';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const rideHistoryRouter = express.Router();

rideHistoryRouter.get('/', usersHistory);
rideHistoryRouter.get('/user/ride-history', isLoggedIn, usersHistory);
rideHistoryRouter.get('/driver/ride-history', isLoggedIn);
rideHistoryRouter.get('/user/ride-history', isLoggedIn);
rideHistoryRouter.post('/ride-history', addUsersHistory);

export default rideHistoryRouter;
