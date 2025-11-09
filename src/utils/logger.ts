import winston from 'winston';
import path from 'path';

const customLevels = {
  levels: {
    critical: 0,
    warn: 1,
    event: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    critical: 'bold red',
    warn: 'yellow',
    event: 'cyan',
    info: 'green',
    debug: 'gray',
  },
};

winston.addColors(customLevels.colors);

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] : ${stack || message}`;
});

const baseLogger = winston.createLogger({
  levels: customLevels.levels,
  level: process.env.NODE_ENV === 'production' ? 'event' : 'debug',
  format: combine(
    colorize({ all: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join('logs', 'critical.log'), level: 'critical' }),
    new winston.transports.File({ filename: path.join('logs', 'warn.log'), level: 'warn' }),
    new winston.transports.File({ filename: path.join('logs', 'events.log'), level: 'event' }),
    new winston.transports.File({ filename: path.join('logs', 'combined.log') }),
  ],
});

// ✅ Define a flexible, type-safe interface
export interface CustomLogger extends winston.Logger {
  critical: (...meta: any[]) => winston.Logger;
  warn: (...meta: any[]) => winston.Logger;
  event: (...meta: any[]) => winston.Logger;
  info: (...meta: any[]) => winston.Logger;
  debug: (...meta: any[]) => winston.Logger;
}

// ✅ Cast and export
export const logger = baseLogger as CustomLogger;
