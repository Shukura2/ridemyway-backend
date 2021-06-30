import { pool } from '../models/pool.js';

import {
  dropUsersTable,
  createUsersTable,
  dropDriversTable,
  createDriversTable,
  dropRideHistoryTable,
  createRideHistoryTable,
  dropRideOffersTable,
  createRideOffersTable,
  referenceOffersTable,
  refDriverIdFromRideHistory,
  refUserIdFromRideHistory
} from './queries.js';

/**
 * Connection to database
 *
 * @param {Array} arr array function
 *
 * @returns {void}
 */
export const executeQueryArray = async (arr) => new Promise(async (resolve) => {
  for (const sqlQuery of arr) {
  await pool.query(sqlQuery);
  }
  resolve();
});

/**
 * Drop tables from database if need be
 *
 * @param {object} arr array function
 *
 * @returns {void}
 */
export const dropTables = () => executeQueryArray([
  dropRideOffersTable,
  dropRideHistoryTable,
  dropUsersTable,
  dropDriversTable
]);

/**
 * Create tables to database
 *
 * @returns {object} tables
 */
export const createUserTable = () => executeQueryArray([
  createUsersTable,
  createDriversTable,
  createRideOffersTable,
  createRideHistoryTable
]);

/**
 * Set up reference to database tables
 *
 * @returns {object} tables
 */
export const tableReference = () => executeQueryArray([
  referenceOffersTable,
  refDriverIdFromRideHistory,
  refUserIdFromRideHistory
]);
