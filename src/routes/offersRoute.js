import express from 'express';
import {
  addUsersOffers, allOffers, deleteOffer, updateOffer
} from '../controllers/offers';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const offersRouter = express.Router();

offersRouter.post('/offer', isLoggedIn, addUsersOffers);
offersRouter.delete('/offer/:id', isLoggedIn, deleteOffer);
offersRouter.put('/offer/:id', isLoggedIn, updateOffer);
offersRouter.get('/offers', allOffers);

export default offersRouter;
