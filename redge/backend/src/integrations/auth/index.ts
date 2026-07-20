import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schema from '../../models';
import { db } from '../drizzle';
import { abacPlugin } from './plugins/abac';

export const auth = betterAuth({
  plugins: [abacPlugin()],
  experimental: {
    joins: true,
  },
  database: drizzleAdapter(db, {
    schema,
    provider: 'pg',
  }),
});
