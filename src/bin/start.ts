import app from '../app.js';
import { balanceSequelize, transactionSequelize, userSequelize } from '../database.js';
import config from '../config/config.js'
const { logger } = config;
const port = process.env.PORT || 3000;

userSequelize
  .authenticate()
  .then(() => {
    logger.info('Connected to the user database.');
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}.`);
    });
  })
  .catch((err) => {
    logger.error('Unable to connect to the user database:', err);
  });
