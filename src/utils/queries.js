export const createUsersTable = `
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    "fullName" varchar NOT NULL,
    email varchar UNIQUE NOT NULL,
    password varchar NOT NULL  
)`;

export const createDriversTable = `
  CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  "fullName" varchar(255) NOT NULL,
  email varchar(70) UNIQUE NOT NULL,
  password varchar NOT NULL
)`;

export const createRideHistoryTable = `
  CREATE TABLE ride_history (
    id SERIAL PRIMARY KEY,
    "driverId" int NOT NULL,
    "userId" int NOT NULL,
    amount int NOT NULL,
    "dateOfTrip" timestamp DEFAULT NOW() NOT NULL,
    destination varchar NOT NULL
)`;

export const createRideOffersTable = `
 CREATE TABLE offers (
   id SERIAL PRIMARY KEY,
    "driverId" int NOT NULL,
    amount varchar NOT NULL,
    "dateTime" timestamp DEFAULT NOW() NOT NULL,
    destination varchar NOT NULL
)`;

export const dropUsersTable = 'DROP TABLE IF EXISTS users';
export const dropDriversTable = 'DROP TABLE IF EXISTS drivers';
export const dropRideOffersTable = 'DROP TABLE IF EXISTS offers';
export const dropRideHistoryTable = 'DROP TABLE IF EXISTS ride_history';