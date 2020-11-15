import app from './app.js';
import db from './services/database.js';
import logger from './services/logger.js';

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info('Express server listening on port ' + port);
  db.connectDB();
});
