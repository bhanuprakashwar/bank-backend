import { Model, DataTypes } from 'sequelize';
import {userSequelize} from '../database.js';

class User extends Model {
  public id!: number;
  public userName!: string;
  public password!: string;
  public emailId!: string;
  public gender!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: userSequelize,
    tableName: 'userDB',
  }
);

export default User;
