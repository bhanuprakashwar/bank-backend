import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../database.js";

class Transaction extends Model {
    public id!: number;
    public amount!: number;
    public sender!: string;
    public receiver!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    sender: {
        type: DataTypes.STRING
    },
    receiver: {
        type: DataTypes.STRING
    }

}, {
    sequelize: sequelizeInstance,
    tableName: "transactionDB"
});

export default Transaction;