import {
  dropTables,
  createUserTable,
} from './queryFunctions';

(async () => {
  await dropTables();
  await createUserTable();
})();
