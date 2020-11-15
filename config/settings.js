import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const settings = {
  db: {
    url: process.env.DB_CONNECTION,
  },
  api: {
    endpoint: 'http://localhost:3000',
  },
  app: {
    endpoint: 'http://localhost:3001',
  },
  log: {
    label: process.env.npm_package_name,
    level: 'silly',
    path: './logs',
    fileName: process.env.npm_package_name,
  },
};

export default settings;
