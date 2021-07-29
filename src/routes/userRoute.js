/* eslint-disable max-len */
import express from 'express';
import { validateCreateUser, isLoggedIn, checkUserDetails } from '../middleware/AuthMiddleware';
import {
  addUsers, editUser, userLogin
} from '../controllers/userController';

const userRouter = express.Router();

/**
 * @swagger
 * definitions:
 *   Signup:
 *     properties:
 *       fullName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *     example: {
 *        "fullName": Ope Bello,
 *       "email": ope@bello.com,
 *       "password": ope123
 *      }
 */
/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     description: Register/Signs up a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Signup'
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
userRouter.post('/users/register', validateCreateUser, addUsers);

/**
 * @swagger
 * definitions:
 *   Login:
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
 * /login:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     description: Login/Logs in a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
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
userRouter.post('/user/login', checkUserDetails, userLogin);

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
 * /edit-profile:
 *   put:
 *     tags:
 *       - Users & Authentication
 *     description: Edit user fullname
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
userRouter.put('/user/edit-profile', isLoggedIn, editUser);

export default userRouter;
