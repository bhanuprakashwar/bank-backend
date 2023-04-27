import { type Request, type Response } from 'express'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const { JWTSECRET, JWT_EXPIRATION } = config

interface UserPayload {
  id: number
  userName: string
  emailId: string
}

const login = async (req: Request, res: Response): Promise<Response> => {
  const { userName, password } = req.body

  try {
    const user = await User.findOne({
      where: {
        userName
      }
    })

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    const token = generateToken({ id: user.id, userName: user.userName, emailId: user.emailId })

    return res.status(200).json({
      apiToken: token
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({
      error: 'Server error'
    })
  }
}

function generateToken (user: UserPayload): string {
  const expiresIn = Number(JWT_EXPIRATION)
  const token = jwt.sign(
    { id: user.id, userName: user.userName, emailId: user.emailId },
    JWTSECRET,
    { expiresIn, algorithm: 'HS256' }
  )
  return token
}

export default {
  login
}
