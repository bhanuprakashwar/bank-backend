import winston from "winston"
import dotenv from "dotenv"
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

dotenv.config();

export default {
  database: {
    user:{
      name: process.env.DB_NAME_USER,
      user: process.env.DB_USER_USER,
      password: process.env.DB_PASSWORD_USER,
    },
    balance:{
      name: process.env.DB_NAME_BALANCE,
      user: process.env.DB_USER_BALANCE,
      password: process.env.DB_PASSWORD_BALANCE,
    }
  },
  JWTSECRET: process.env.JWTSECRET,
  JWT_EXPIRATION:process.env.JWT_EXPIRATION,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  logger,
};