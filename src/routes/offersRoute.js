import express from 'express';
import { deleteOffer, offersRequest, updateOffer } from '../controllers/offers';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const offersRouter = express.Router();

offersRouter.get('/', offersRequest);
offersRouter.get('/driver/offers', offersRequest);
offersRouter.post('/offers/request', isLoggedIn, offersRequest);
offersRouter.delete('/offer/delete/:id', isLoggedIn, deleteOffer);
offersRouter.put('/offer/update/:id', isLoggedIn, updateOffer);

export default offersRouter;
