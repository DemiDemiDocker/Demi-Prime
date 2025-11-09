// src/config.ts
import * as dotenv from 'dotenv';
import path from 'node:path';

// Detect environment mode (default to 'development')
const env = process.env.NODE_ENV || 'development';

// Choose the correct .env file
const envFile = env === 'production' ? '.env.prod' : '.env.dev';

// Load the file
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const CONFIG = {
  env,
  botToken: process.env.BOT_TOKEN!,
  databaseUrl: process.env.DATABASE_URL!,
  debug: process.env.DEBUG === 'true',
};
