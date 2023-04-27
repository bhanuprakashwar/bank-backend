import { Model, DataTypes } from 'sequelize'
import { sequelizeInstance } from '../database.js'

class Balance extends Model {
  public id!: number
  public balance!: number
  public userId!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Balance.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false
  }
},
{
  sequelize: sequelizeInstance,
  tableName: 'balanceDB'
})

export default Balance
