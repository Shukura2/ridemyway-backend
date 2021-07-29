/* eslint-disable max-len */
import express from 'express';
import {
  addUsersOffers, allOffers, deleteOffer, updateOffer
} from '../controllers/offers';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const offersRouter = express.Router();

/**
 * @swagger
 * definitions:
 *   Offer:
 *     properties:
 *       driverId:
 *         type: object
 *       amount:
 *         type: string
 *       destination:
 *         type: string
 *     example: {
 *        "driverId": 1,
 *       " amount": Ope Bello,
 *       " destination": Isolo
 *      }
 */
/**
 * @swagger
 * /offer:
 *   post:
 *     tags:
 *       - Offers & Authentication
 *     description: A driver posts offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Offer'
 *     responses:
 *       201:
 *         description: Successfully created
 *         example: {
 *           "message": "Signed up successfully",
 *           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJpc0Jhbm5lZCI6MCwicGxhbiI6IlNpbHZlciIsImFjdGl2ZSI6ZmFsc2UsImlzQWRtaW4iOjAsImlkIjo1LCJ1c2VybmFtZSI6InRlc3RlciIsImZ1bGxOYW1lIjoiTmFzaXJ1IE9sYSIsImVtYWlsIjoibmFzaXJ1QGdtYWlsLmNvbSIsInVzZXJJZCI6NX0sImV4cCI6MTUxNTI1ODY4NywiaWF0IjoxNTE1MTcyMjg3fQ.1cISJjOboFY1zxqKEIZFpBJTSawG7BkMG6iGdhMxxGU"
 *         }
 *       500:
 *         description: Internal server error
 */
offersRouter.post('/offer', isLoggedIn, addUsersOffers);

/**
 * @swagger
 * definitions:
 *   Delete offer:
 */
/**
 * @swagger
 * /offer/{driverId}:
 *   delete:
 *     tags:
 *       - Offers & Authentication
 *     description: A driver deletes a ride offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Delete offer'
 *     responses:
 *       200:
 *         description: Successfully deleted
 *         example: {
 *           "message": "Offer deleted",
 *           "success": true
 *         }
 *       500:
 *         description: Internal server error
 */
offersRouter.delete('/offer/:id', isLoggedIn, deleteOffer);

/**
 * @swagger
 * definitions:
 *   Edit offer:
 *    properties:
 *       destination:
 *         type: string
 *       amount:
 *         type: string
 *       example: {
 *        "destination": Yaba,
 *        "amount": 200
 *      }
 */
/**
 * @swagger
 * /offer/1:
 *   put:
 *     tags:
 *       - Offers & Authentication
 *     description: A driver edits ride offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Edit offer'
 *     responses:
 *       200:
 *         description: Successfully deleted
 *         example: {
 *           "message": "Offer deleted",
 *           "success": true
 *         }
 *       500:
 *         description: Internal server error
 */
offersRouter.put('/offer/:id', isLoggedIn, updateOffer);

/**
 * @swagger
 * definitions:
 *   All offers:
 */
/**
 * @swagger
 * /offers:
 *   get:
 *     tags:
 *       - Offers & Authentication
 *     description: Get all offers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/All offers'
 *     responses:
 *       200:
 *         description: object of all offers
 *         example: {
 *           "success": true
 *         }
 *       400:
 *         description: No offers
 *       500:
 *         description: Internal server error
 */
offersRouter.get('/offers', allOffers);

export default offersRouter;
