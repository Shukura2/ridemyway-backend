import {
  dropTables,
  createUserTable,
  insertIntoTable
} from './queryFunctions.js';

(async () => {
  await dropTables();
  await createUserTable();
  await insertIntoTable();
})();
