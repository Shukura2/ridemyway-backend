import express from 'express';
import {
  addUsersOffers, deleteOffer, updateOffer
} from '../controllers/offers';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const offersRouter = express.Router();

offersRouter.post('/offers/request', isLoggedIn, addUsersOffers);
offersRouter.delete('/offer/:id', isLoggedIn, deleteOffer);
offersRouter.put('/offer/update/:id', isLoggedIn, updateOffer);

export default offersRouter;
