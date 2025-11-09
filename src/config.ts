// src/config.ts
import * as dotenv from 'dotenv';
import path from 'node:path';

// Detect environment mode (default to 'development')
const env = process.env.NODE_ENV || 'development';

// Choose the correct .env file
const envFile = env === 'production' ? '.env.prod' : '.env.dev';

// Load environment variables from the right file
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Export strongly typed configuration
export const CONFIG = {
  env,
  botToken: process.env.BOT_TOKEN!,
  databaseUrl: process.env.DATABASE_URL!,
  databaseType: process.env.DATABASE_TYPE || 'postgres', // ✅ added
  debug: process.env.DEBUG === 'true',
};
