import { pool } from '../models/pool.js';
import {
  dropUsersTable,
  createUsersTable,
  insertIntoUsersTable,
  dropDriversTable,
  createDriversTable,
  insertIntoDriversTable,
  dropRideHistoryTable,
  createRideHistoryTable,
  dropRideOffersTable,
  createRideOffersTable,
  insertIntoOffersTable
  // userIdReferenceUsersTable

} from './queries.js';

export const executeQueryArray = async (arr) =>
  new Promise((resolve) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) resolve();
    });
  });

export const dropTables = () => executeQueryArray([
  dropUsersTable,
  dropDriversTable,
  dropRideOffersTable,
  dropRideHistoryTable
]);


export const createUserTable = () => executeQueryArray([
  createRideOffersTable,
  createRideHistoryTable,
  createUsersTable,
  createDriversTable
  //  userIdReferenceUsersTable
  
]);

export const insertIntoTable = () => executeQueryArray([
  insertIntoUsersTable, 
  insertIntoDriversTable,
  insertIntoOffersTable

]);


