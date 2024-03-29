import { type Request, type Response } from 'express'
import User from '../models/user.js'
import balanceController from './balanceController.js'
import bcrypt from 'bcryptjs'
import { sequelizeInstance } from '../database.js'
// CREATE a new user
const createUser = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelizeInstance.transaction()
  try {
    const { userName, password, emailId, gender } = req.body
    await User.sync()
    let user = await User.findOne({
      where: {
        userName
      },
      transaction
    })
    if (user) {
      return res.status(409).json({
        message: 'Username already taken',
        balance: false,
        account: false
      })
    }
    const hashPassword = await bcrypt.hash(password, 12)

    // Create user
    user = await User.create({
      userName,
      password: hashPassword,
      emailId,
      gender
    }, { transaction })

    const balanceAccount = await balanceController.createBalanceAccount(user.id, transaction)

    if (balanceAccount) {
      await transaction.commit()
      res.status(201).json({
        message: `Successfully opened the account for ${userName} with 100000 rupees`,
        balance: true,
        account: true
      })
    } else {
      await transaction.rollback()
      res.status(201).json({
        message: `Successfully created the ${userName} user but problem with balance`,
        balance: false,
        account: true
      })
    }
  } catch (error) {
    console.error(error)
    await transaction.rollback()
    res.status(500).json({
      message: 'Server Error',
      balance: false,
      account: false
    })
  }
}

// GET all users
const getTotalUserCount = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll()
    const usersCount = users.length
    res.status(200).json({ usersCount })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

// GET a single user by id
const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.query.userId)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    const userObject = {
      userName: user.userName,
      emailId: user.emailId,
      gender: user.gender
    }
    res.status(200).json(userObject)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

// UPDATE a user
const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const { userName, password, emailId, gender } = req.body

    await user.update({
      userName,
      password,
      emailId,
      gender
    })

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

// DELETE a user
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    await user.destroy()

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}
export default {
  createUser,
  getTotalUserCount,
  getUserById,
  updateUser,
  deleteUser
}
