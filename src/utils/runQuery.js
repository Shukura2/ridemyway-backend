import {
  tableReference,
  dropTables,
  createUserTable,
} from './queryFunctions';

(async () => {
  await dropTables();
  await createUserTable();
  await tableReference();
})();
