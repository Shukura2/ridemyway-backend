import Model from '../models/model.js';

const rideOffer = new Model('offers');
export const offersReq = async (req, res) => {
    try {
      const data = await rideOffer.select('driver_id, users_id, amount, date, destination');
      res.status(200).json({ offers: data.rows });
    } catch (err) {
      res.status(200).json({ offers: err.stack });
    }
};

export const addUsersOffers = async (req, res) => {
    const {
        driver_id, users_id, amount, destination
    } = req.body;
    console.log(req.body);
    const columns = 'driver_id, user_id, amount, destination';
    const values = `'${driver_id}', '${users_id}', '${amount}', '${destination}'`;
    console.log(values);
    try {
      const data = await rideHistoryModel.insertWithReturn(columns, values);
      res.status(200).json(data.rows[0]);
    } catch (err) {
      
      res.status(500).json(err);
    }
  };

  
export const deleteOffer = async (req, res) => {
  console.log(req.user)
  const driver_id = req.user.driver.id
  const id = req.params.id
    try {
      const data = await rideOffer.delete(`WHERE "id" = '${id}' AND "driver_id" = '${driver_id}'`);
      res.status(200).json({ offers: data.rows });
    } catch (err) {
      res.status(200).json({ offers: err.stack });
    }
};


export const updateOffer = async (req, res) => {
  console.log(req.user)
  const driver_id = req.user.driver.id
  const id = req.params.id
    try {
      const data = await rideOffer.update(req.body, `WHERE "id" = '${id}' AND "driver_id" = '${driver_id}'`);
      res.status(200).json({ offers: data.rows });
    } catch (err) {
      res.status(200).json({ offers: err.stack });
    }
};
