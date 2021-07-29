/* eslint-disable max-len */
import express from 'express';
import {
  addDrivers, driverLogin, editDriver
} from '../controllers/driver';
import { checkDriverDetails, isLoggedIn, validateCreateDriver } from '../middleware/AuthMiddleware';

const driverRouter = express.Router();

/**
 * @swagger
 * definitions:
 *   Driver signup:
 *     properties:
 *       fullName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *     example: {
 *       "fullName": Ope Bello,
 *       "email": ope@bello.com,
 *       "password": ope123
  *      }
 */
/**
 * @swagger
 * /drivers/register:
 *   post:
 *     tags:
 *       - Drivers & Authentication
 *     description: Register/Signs up a Driver
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Driver signup'
 *     responses:
 *       201:
 *         description: Successfully created
 *         example: {
 *           "message": "Signed up successfully",
 *           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJpc0Jhbm5lZCI6MCwicGxhbiI6IlNpbHZlciIsImFjdGl2ZSI6ZmFsc2UsImlzQWRtaW4iOjAsImlkIjo1LCJ1c2VybmFtZSI6InRlc3RlciIsImZ1bGxOYW1lIjoiTmFzaXJ1IE9sYSIsImVtYWlsIjoibmFzaXJ1QGdtYWlsLmNvbSIsInVzZXJJZCI6NX0sImV4cCI6MTUxNTI1ODY4NywiaWF0IjoxNTE1MTcyMjg3fQ.1cISJjOboFY1zxqKEIZFpBJTSawG7BkMG6iGdhMxxGU"
 *         }
 *       400:
 *         description: Bad Username, Password or Email
 *       500:
 *         description: Internal server error
 */
driverRouter.post('/drivers/register', validateCreateDriver, addDrivers);

/**
 * @swagger
 * definitions:
 *   Driver login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *     example: {
 *       "email": ope@bello.com,
 *       "password": ope123
 *      }
 */
/**
 * @swagger
 * /driver/login:
 *   post:
 *     tags:
 *       - Drivers & Authentication
 *     description: Login/Logs in a Driver
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Driver login'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         example: {
 *           "message": "User logged in successfully",
 *           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJpc0Jhbm5lZCI6MCwicGxhbiI6IlNpbHZlciIsImFjdGl2ZSI6ZmFsc2UsImlzQWRtaW4iOjAsImlkIjo1LCJ1c2VybmFtZSI6InRlc3RlciIsImZ1bGxOYW1lIjoiTmFzaXJ1IE9sYSIsImVtYWlsIjoibmFzaXJ1QGdtYWlsLmNvbSIsInVzZXJJZCI6NX0sImV4cCI6MTUxNTI1ODY4NywiaWF0IjoxNTE1MTcyMjg3fQ.1cISJjOboFY1zxqKEIZFpBJTSawG7BkMG6iGdhMxxGU"
 *         }
 *       400:
 *         description: Bad Password or Email
 *       500:
 *         description: Internal server error
 */
driverRouter.post('/driver/login', checkDriverDetails, driverLogin);

/**
 * @swagger
 * definitions:
 *   Edit profile:
 *     properties:
 *       fullname:
 *         type: string
 *     example: {
 *       "fullName": Ope Kazeem
 *      }
 */
/**
 * @swagger
 * /driver/edit-profile:
 *   put:
 *     tags:
 *       - Drivers & Authentication
 *     description: Edit driver fullname
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Edit profile'
 *     responses:
 *       200:
 *         description: Edit completed
 *         example: {
 *           "message": "Edit completed",
 *           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJpc0Jhbm5lZCI6MCwicGxhbiI6IlNpbHZlciIsImFjdGl2ZSI6ZmFsc2UsImlzQWRtaW4iOjAsImlkIjo1LCJ1c2VybmFtZSI6InRlc3RlciIsImZ1bGxOYW1lIjoiTmFzaXJ1IE9sYSIsImVtYWlsIjoibmFzaXJ1QGdtYWlsLmNvbSIsInVzZXJJZCI6NX0sImV4cCI6MTUxNTI1ODY4NywiaWF0IjoxNTE1MTcyMjg3fQ.1cISJjOboFY1zxqKEIZFpBJTSawG7BkMG6iGdhMxxGU"
 *         }
 *       500:
 *         description: Internal server error
 */
driverRouter.put('/driver/edit-profile', isLoggedIn, editDriver);

export default driverRouter;
