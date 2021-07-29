/* eslint-disable max-len */
import express from 'express';
import { allHistory, joinRide } from '../controllers/RideHistory';
import { isLoggedIn } from '../middleware/AuthMiddleware';

const rideHistoryRouter = express.Router();

/**
 * @swagger
 * definitions:
 *   Join ride:
 */
/**
 * @swagger
 * /join/ride/1:
 *   post:
 *     tags:
 *       - Join Ride & Authentication
 *     description: Join a ride
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Join ride'
 *     responses:
 *       200:
 *         description: Join a Ride
 *       400:
 *         description: Authentication token is invalid or expired
 *       404:
 *         description: There is no offer with this id
 */
rideHistoryRouter.post('/join/ride/:id', isLoggedIn, joinRide);

/**
 * @swagger
 * definitions:
 *   All history:
 */
/**
 * @swagger
 * /all-history:
 *   get:
 *     tags:
 *       - Join Ride & Authentication
 *     description: Get all history
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/All history'
 *     responses:
 *       200:
 *         description: object of all ride history
 *         example: {
 *           "message": "Ride offer joined",
 *           "success": true
 *         }
 *       400:
 *         description: Authentication token is invalid or expired
 *       404:
 *         description: There is no offer with this id
 */
rideHistoryRouter.get('/all-history', allHistory);

export default rideHistoryRouter;
