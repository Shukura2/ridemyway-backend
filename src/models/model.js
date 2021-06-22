import { pool } from './pool.js';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client${client}`
    );
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table} `;
    if (clause) query += clause;
    return this.pool.query(query);
  }


  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING id, ${columns}
      `;
    return this.pool.query(query);
  }

  async delete(clause) {
    let query = `DELETE FROM ${this.table} ${clause} `;
    console.log(query)
    return this.pool.query(query);
  }

  async update(datas, clause) {
    let query;

    if (typeof datas !== 'object'){
      return 'Invalid data'
    }
  if(datas){                                                    
    const keys = Object.keys(datas);                            
    const allData = keys.map(key => `${key} = '${datas[key]}'`);  
    const allDataJoin = allData.join(', ');                     
    query = `UPDATE ${this.table} SET ${allDataJoin} ${clause}`;
  }else{
    console.log('Invalid Details');
  }
    console.log(query)
    return this.pool.query(query);
  }
}


export default Model;
