import logger from 'morgan';
import express from 'express';
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

app.use((err, req, res) => {
  res.status(400).json({ error: err.stack });
});

export default app;
