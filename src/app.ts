import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes/index.js';
import config from './config/config.js';

const app = express();
const {logger} = config;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(compression());

// Set up routes
app.use('/', routes);

// Handle 404 errors
app.use((req, res) => {
  logger.error(`404: ${req.url}`);
  res.status(404).json({ error: 'Not Found' });
});

// Handle server errors
app.use((err, req, res, next) => {
  logger.error(`500: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
