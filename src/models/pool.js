import pg from 'pg';
import dotenv from 'dotenv';
import { connectionString } from '../settings';

dotenv.config();

const { Pool } = pg;
export const pool = new Pool({ connectionString });
