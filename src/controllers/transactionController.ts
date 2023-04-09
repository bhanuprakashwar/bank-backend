import { Request, Response } from 'express';
import User from '../models/user.js';
import Balance from '../models/balance.js';
import balanceController from './balanceController.js';
import { transactionSequelize } from '../database.js';
import Transaction from '../models/transaction.js';

const debitAccount = () => {

}

const creditAccount = () => {
}
const transferMoney = async (req: Request, res: Response) => {
    await Transaction.sync();
    const transaction = await transactionSequelize.transaction();
    try {
        const { transferFrom, transferTo, amount } = req.body;
        console.log("Entered the transfer method");
        console.log(req.body);
        console.log("Okay")
        const receiverExists = await User.findOne({
            where: {
                id: transferTo
            },
            transaction
        });
        console.log("receiverExists:", receiverExists);
        if (!receiverExists) {
            res.status(404).send({ message: "Receiver not found" });
        }
        const sender = await Balance.findOne({
            where: {
                userId: transferFrom
            },
            transaction
        });
        const receiver = await Balance.findOne({
            where: {
                userId: transferTo
            },
            transaction
        });
        if (sender.balance < amount) {
            res.status(402).send({ message: "Insufficent balance" });
        }
        //need to implement rest of the code
        sender.balance -= amount;
        const updatedSenderBalance = await balanceController.updateBalance(transferFrom, sender.balance,transaction);
        receiver.balance += amount
        const updatedReceiverBalance = await balanceController.updateBalance(transferTo, receiver.balance, transaction);
        await transaction.commit();
        await Transaction.create({
            transferFrom: sender.userId,
            transferTo: receiver.userId,
            amount: amount,
            status: "Success"
        })
        res.status(201).send({message:"Transaction Successful"});

    } catch (error) {
        await transaction.rollback();
        console.log(error);
        await Transaction.create({
            transferFrom: req.body.transferFrom,
            transferTo: req.body.transferTo,
            amount: req.body.amount,
            status: "Failed"
        });
        res.status(500).send({ message: "Server Error" });
    }
}

const getTransactionDetails = () => {

}

export default {
    transferMoney,
    getTransactionDetails
}