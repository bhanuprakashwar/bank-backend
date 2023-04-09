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
      host: process.env.DB_HOST_USER
    },
    balance:{
      name: process.env.DB_NAME_BALANCE,
      user: process.env.DB_USER_BALANCE,
      password: process.env.DB_PASSWORD_BALANCE,
      host: process.env.DB_HOST_BALANCE
    },
    transaction:{
      name: process.env.DB_NAME_TRANSACTION,
      user: process.env.DB_USER_TRANSACTION,
      password: process.env.DB_PASSWORD_TRANSACTION,
      host: process.env.DB_HOST_TRANSACTION
    }
  },
  JWTSECRET: process.env.JWTSECRET,
  JWT_EXPIRATION:process.env.JWT_EXPIRATION,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  logger,
};