import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
  debug: true,
  path: [path.resolve(import.meta.dirname, '../../.env')],
});
