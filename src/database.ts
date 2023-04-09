import { Sequelize } from 'sequelize';
import config from './config/config.js'

const {database} = config

const userSequelize = new Sequelize(database.user.name, database.user.user, database.user.password, {
  host: database.user.host,
  dialect: 'postgres',
  logging: false,
});

const balanceSequelize = new Sequelize(database.balance.name, database.balance.user, database.balance.password, {
  host: database.balance.host,
  dialect: 'postgres',
  logging: false,
});

const transactionSequelize = new Sequelize(database.transaction.name, database.transaction.user, database.transaction.password, {
  host: database.transaction.host,
  dialect: 'postgres',
  logging: false
})


export {
  userSequelize,
  balanceSequelize,
  transactionSequelize
};
