export const createUsersTable = `
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    full_name varchar NOT NULL,
    email varchar UNIQUE NOT NULL,
    password varchar NOT NULL  
)`;

// export const insertIntoUsersTable = `
// INSERT INTO users(full_name, email, password)
// VALUES ('Adeyemi', 'adeyemi@yahoo.com', 'ades12345')
// `;

export const createDriversTable = `
  CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  full_name varchar(255) NOT NULL,
  email varchar(70) UNIQUE NOT NULL,
  password varchar NOT NULL
)`;

export const insertIntoDriversTable = `
INSERT INTO drivers(full_name, email, password)
VALUES ('Pauliski', 'pauliski@yahoo.com', 'paul12345')
`;

export const createRideHistoryTable = `
  CREATE TABLE ride_history (
    id SERIAL PRIMARY KEY,
    driver_id int NOT NULL,
    user_id int NOT NULL,
    amount int NOT NULL,
    date_of_trip timestamp DEFAULT NOW() NOT NULL,
    destination varchar NOT NULL
)`;


 export const createRideOffersTable = `
 CREATE TABLE offers (
   id SERIAL PRIMARY KEY,
    driver_id int NOT NULL,
    amount varchar NOT NULL,
    datetime timestamp DEFAULT NOW() NOT NULL,
    destination varchar NOT NULL
)`;

export const insertIntoOffersTable = `
INSERT INTO offers(driver_id, amount, destination)
VALUES (2, '1500', 'Ikorodu')
`;


// export const userIdReferenceUsersTable = 'ALTER TABLE rideHistory ADD FOREIGN KEY (driver_id) REFERENCES drivers(id)';

export const dropUsersTable = 'DROP TABLE IF EXISTS users';
export const dropDriversTable = 'DROP TABLE IF EXISTS drivers';
 export const dropRideOffersTable = 'DROP TABLE IF EXISTS offers';
export const dropRideHistoryTable = 'DROP TABLE IF EXISTS ride_history';



