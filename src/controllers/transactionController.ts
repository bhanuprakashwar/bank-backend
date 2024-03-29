import { type Request, type Response } from 'express'
import User from '../models/user.js'
import Balance from '../models/balance.js'
import balanceController from './balanceController.js'
import { sequelizeInstance } from '../database.js'
import Transaction from '../models/transaction.js'
import { Op } from 'sequelize'

const transferMoney = async (req: Request, res: Response): Promise<Response> => {
  const { transferFrom, transferTo, balance } = req.body
  const transaction = await sequelizeInstance.transaction()
  try {
    // Check if transferFrom and transferTo users exist in the UserDB
    const receiver = await User.findOne({ where: { id: transferTo } })

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver user not found' })
    }

    // Check if transferFrom user has sufficient balance
    const senderBalance = await Balance.findOne({
      where: { userId: transferFrom },
      attributes: ['balance']
    })

    if (!senderBalance || senderBalance.balance < balance) {
      return res.status(400).json({ message: 'Insufficient balance' })
    }

    // Perform transaction using sequelize transaction method
    await balanceController.debitBalance(transferFrom, balance, transaction)
    await balanceController.creditBalance(transferTo, balance, transaction)

    // Create transaction record in the TransactionDB
    await Transaction.sync()
    await Transaction.create(
      {
        amount: balance,
        sender: transferFrom,
        receiver: transferTo
      },
      { transaction }
    )
    await transaction.commit()
    return res.json({ message: 'Transaction successful' })
  } catch (error) {
    console.error(error)
    await transaction.rollback()
    return res.status(500).json({ message: 'Error performing transaction' })
  }
}

const getRecentTransactions = async (req: Request, res: Response): Promise<Response> => {
  const { transactionLimit, userId } = req.body
  try {
    const transactions = await Transaction.findAll({
      where: { sender: userId },
      limit: transactionLimit,
      order: [['createdAt', 'DESC']]
    })
    res.status(200).json({ transactions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getTransactions = async (req: Request, res: Response): Promise<Response> => {
  const { startDate, endDate, userId } = req.body
  try {
    // Retrieve the last 10 transactions for the given user ID
    const transactions = await Transaction.findAll({
      where: {
        sender: userId,
        createdAt: { [Op.between]: [startDate, endDate] }
      },
      order: [['createdAt', 'DESC']]
    })
    res.status(200).json({ transactions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default { transferMoney, getTransactions, getRecentTransactions }
