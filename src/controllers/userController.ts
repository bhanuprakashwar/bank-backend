import { Request, Response } from 'express';
import User from '../models/user.js';
import balanceController from './balanceController.js';

// CREATE a new user
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password, emailId, gender } = req.body;
    await User.sync();
    let user = await User.findOne({
      where: {
        userName
      }
    });

    if (user) {
      return res.status(409).json({
        error: 'Username already taken'
      });
    }

    // Create user
    user = await User.create({
      userName,
      password,
      emailId,
      gender,
    });
    const balanceAccount = await balanceController.createBalanceAccount(user.id);
    if (balanceAccount) {
      res.status(201).json({
        message: `Successfully opened the account for ${userName} with 100000 rupees`,
        balance: true,
        account: true,
      });
    } else {
      res.status(201).json({
        message: `Successfully created the ${userName} user but problem with balance`,
        balance: false,
        account: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET all users
const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET a single user by id
const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// UPDATE a user
const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const { userName, password, emailId, gender } = req.body;

    await user.update({
      userName,
      password,
      emailId,
      gender,
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE a user
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}

