import express from 'express';
import { addUsersHistory, allHistory } from '../controllers/RideHistory';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const rideHistoryRouter = express.Router();

rideHistoryRouter.post('/offer/request', isLoggedIn, addUsersHistory);
rideHistoryRouter.get('/all-history', allHistory);

export default rideHistoryRouter;
