import { Sequelize } from 'sequelize'
import config from './config/config.js'

const { database } = config

const sequelizeInstance = new Sequelize(database.name, database.userName, database.password, {
  host: database.hostName,
  dialect: 'postgres',
  logging: false
})

export {
  sequelizeInstance
}
