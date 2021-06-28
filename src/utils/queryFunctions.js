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
} from './queries.js';

/**
 * Connection to database
 *
 * @param {Array} arr array function
 *
 * @returns {void}
 */
export const executeQueryArray = async (arr) => new Promise((resolve) => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

/**
 * Drop tables from database if need be
 *
 * @param {object} arr array function
 *
 * @returns {void}
 */
export const dropTables = () => executeQueryArray([
  dropUsersTable,
  dropDriversTable,
  dropRideOffersTable,
  dropRideHistoryTable
]);

/**
 * Create tables to database
 *
 * @returns {object} tables
 */
export const createUserTable = () => executeQueryArray([
  createUsersTable,
  createRideOffersTable,
  createRideHistoryTable,
  createDriversTable
]);
