import { pool } from './pool.js';

/**
 * Connection to database
 *
 * @returns {object} from the database
 */
class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  /**
   * Database model database
   *
   * @param {object} columns columns
   *
   * @param {object} clause clause
   *
   * @returns {object} object
   */
  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table} `;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  /**
 * Model for Insert to database
 *
 * @param {object} columns columns
 *
 * @param {object} values values
 *
 * @returns {object} inserted data
 */
  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING id, ${columns}
      `;
    return this.pool.query(query);
  }

  /**
 * Model for delete
 *
 * @param {object} clause clause
 *
 * @returns {void}
 */
  async delete(clause) {
    const query = `DELETE FROM ${this.table} ${clause} `;
    return this.pool.query(query);
  }

  /**
   * Model for update
   *
   * @param {object} data data
   *
   * @param {object} clause clause
   *
   * @returns {object} updated data
   */
  async update(data, clause) {
    let query;

    if (typeof data !== 'object') {
      return 'Invalid data';
    }
    if (data) {
      const keys = Object.keys(data);
      const allData = keys.map((key) => `${key} = '${data[key]}'`);
      const allDataJoin = allData.join(', ');
      query = `UPDATE ${this.table} SET ${allDataJoin} ${clause}`;
    }
    return this.pool.query(query);
  }
}

export default Model;
