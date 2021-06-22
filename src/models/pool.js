import pg from 'pg';
import dotenv from 'dotenv';
import { connectionString } from '../settings.js';
dotenv.config();

const { Pool } = pg;
console.log('connectionString', connectionString);
export const pool = new Pool({ connectionString });
