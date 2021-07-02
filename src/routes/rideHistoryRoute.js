import express from 'express';
import { addUsersHistory, deleteHistory } from '../controllers/RideHistory';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const rideHistoryRouter = express.Router();

rideHistoryRouter.post('/ride-history', isLoggedIn, addUsersHistory);
rideHistoryRouter.delete('/history/:id', isLoggedIn, deleteHistory);

export default rideHistoryRouter;
