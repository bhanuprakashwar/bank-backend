import { Request, Response } from 'express';
import Balance from "../models/balance.js";
import { Transaction } from 'sequelize';
import { sequelizeInstance } from '../database.js';

const createBalanceAccount = async (userId: number, transaction: Transaction) => {
    try {
        await Balance.sync();
        await Balance.create({
            userId,
            balance: 100000
        }, { transaction });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const debitBalance = async (userId: string, amount: number, transaction: Transaction) => {
    try {
        await Balance.update({ balance: sequelizeInstance.literal(`balance - ${amount}`) }, {
            where: {
                userId: userId
            },
            transaction
        });
    } catch (error) {
        console.log(error);
    }
}

const creditBalance = async (userId: string, amount: number, transaction: Transaction) => {
    try {
        await Balance.update({ balance: sequelizeInstance.literal(`balance + ${amount}`) }, {
            where: {
                userId: userId
            },
            transaction
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteBalanceAccount = () => {

}

//need to replace the userId with accountNumber
const getBalance = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId;
        console.log(userId);
        const userBalanceInfo = await Balance.findOne({
            where: {
                userId: userId
            }
        });
        if (userBalanceInfo?.balance) {
            res.status(200).send({ userId: userId, balance: userBalanceInfo.balance });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }
}

export default {
    createBalanceAccount,
    debitBalance,
    creditBalance,
    deleteBalanceAccount,
    getBalance
}