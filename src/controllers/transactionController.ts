import { Request, Response } from 'express';
import User from '../models/user.js';
import Balance from '../models/balance.js';
import balanceController from './balanceController.js';
import { sequelizeInstance } from '../database.js';
import Transaction from '../models/transaction.js';

const transferMoney = async (req: Request, res: Response) => {
  const { transferFrom, transferTo, balance } = req.body;
  const transaction = await sequelizeInstance.transaction();
  try {
    // Check if transferFrom and transferTo users exist in the UserDB
    const receiver = await User.findOne({ where: { id: transferTo } });

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver user not found' });
    }

    // Check if transferFrom user has sufficient balance
    const senderBalance = await Balance.findOne({
      where: { userId: transferFrom },
      attributes: ['balance'],
    });

    if (!senderBalance || senderBalance.balance < balance) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Perform transaction using sequelize transaction method
    await balanceController.debitBalance(transferFrom, balance, transaction);
    await balanceController.creditBalance(transferTo, balance, transaction);

    // Create transaction record in the TransactionDB
    await Transaction.sync();
    await Transaction.create(
      {
        amount: balance,
        sender: transferFrom,
        receiver: transferTo,
      },
      { transaction }
    );
    await transaction.commit();
    return res.json({ message: 'Transaction successful' });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return res.status(500).json({ message: 'Error performing transaction' });
  }
};

const getTransactions = async (req: Request, res: Response) => {

};

export default { transferMoney, getTransactions };
