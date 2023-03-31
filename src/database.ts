import { Sequelize } from 'sequelize';
import config from './config/config.js'

const {database} = config

const userSequelize = new Sequelize(database.user.name, database.user.user, database.user.password, {
  host: database.user.name,
  dialect: 'postgres',
  logging: false,
});

const balanceSequelize = new Sequelize(database.balance.name, database.balance.user, database.balance.password, {
  host: database.balance.name,
  dialect: 'postgres',
  logging: false,
});


export {
  userSequelize,
  balanceSequelize
};
