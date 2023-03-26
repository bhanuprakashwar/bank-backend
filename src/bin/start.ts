import app from '../app.js';
import sequelize from '../database.js';
import config from '../config/config.js'
const {logger} = config;
const port = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connected to the database.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  logger.info(`Server is running on port ${port}.`);
});
