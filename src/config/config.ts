import winston from "winston"
import dotenv from "dotenv"
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

dotenv.config();

export default {
  database: {
      name: process.env.DB_NAME,
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      hostName: process.env.DB_HOST
  },
  JWTSECRET: process.env.JWTSECRET,
  JWT_EXPIRATION:process.env.JWT_EXPIRATION,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  logger,
};