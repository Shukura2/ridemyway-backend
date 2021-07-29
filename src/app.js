import logger from 'morgan';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute';
import driverRouter from './routes/driverRoute';
import rideHistoryRouter from './routes/rideHistoryRoute';
import offersRouter from './routes/offersRoute';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', userRouter);
app.use('/v1', driverRouter);
app.use('/v1', rideHistoryRouter);
app.use('/v1', offersRouter);

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ride-my-way',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res) => {
  res.status(400).json({ error: err.stack });
});

export default app;
