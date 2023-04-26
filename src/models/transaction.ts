import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../database.js";

class Transaction extends Model {
    public id!: string;
    public amount!: number;
    public sender!: number;
    public receiver!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Transaction.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    sender: {
        type: DataTypes.INTEGER
    },
    receiver: {
        type: DataTypes.INTEGER
    }

}, {
    sequelize: sequelizeInstance,
    tableName: "transactionDB"
});

export default Transaction;