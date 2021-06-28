import {
  dropTables,
  createUserTable
} from '../src/utils/queryFunctions';

// eslint-disable-next-line no-undef
before(async () => {
  await createUserTable();
});

// eslint-disable-next-line no-undef
after(async () => {
  dropTables();
});
