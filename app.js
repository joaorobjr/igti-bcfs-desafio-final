import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import logger from './services/logger.js';

global.logger = logger;

const app = express();
app.use(express.json());
app.use(cors());

/**
 * Vinculando o React ao app
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Rota raiz
 */
app.get('/api/', (_, response) => {
  response.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});

/**
 * Rotas principais do app
 */
app.use('/api/transaction', routes);

export default app;
