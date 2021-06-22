import Model from '../models/model.js';

const rideHistoryModel = new Model('ride_history');

export const usersHistory = async (req, res) => {
  const {id} = req.user.user
    console.log(req.user)
    try {
      const data = await rideHistoryModel.select('driver_id, user_id, amount, date_of_trip, destination', `WHERE "user_id" = '${id}'`);
      res.status(200).json({ rideHistory: data.rows });
    } catch (err) {
      res.status(200).json({ rideHistory: err.stack });
    }
};

export const addUsersHistory = async (req, res) => {
    const {
        driver_id, user_id, amount, destination
    } = req.body;
    console.log(req.body);
    const columns = 'driver_id, user_id, amount, destination';
    const values = `'${driver_id}', '${user_id}', '${amount}', '${destination}'`;
    console.log(values);
    try {
      const data = await rideHistoryModel.insertWithReturn(columns, values);
      res.status(200).json(data.rows[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  };
