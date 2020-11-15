import winston from 'winston';
import winstondb from 'winston-mongodb';
import settings from '../config/settings.js';

const { combine, timestamp, label, printf } = winston.format;

const { createLogger, transports, format } = winston;

const { db, log } = settings;

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: `${log.path}/${log.fileName}.log` }),
    new transports.MongoDB({
      level: 'info',
      db: db.url,
      collection: 'logs',
      capped: true,
      cappedMax: 20,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: format.combine(
    label({ label: log.label }),
    format.timestamp(),
    myFormat
  ),
});

export default logger;
