import winston from "winston"
import dotenv from "dotenv"
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

dotenv.config();

export default {
  database: {
    dsn: 'mongodb://localhost:37017/warbank',
    status: {
      connected: false,
      error: false,
    },
  },
  JWTSECRET: process.env.JWTSECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  logger,
};