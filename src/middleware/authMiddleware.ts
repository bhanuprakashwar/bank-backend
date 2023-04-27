import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const { JWTSECRET } = config

interface DecodedToken {
  id: number
}

export const validateRequest = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({
      error: 'Authorization denied'
    })
  }

  try {
    const decoded = jwt.verify(token, JWTSECRET) as DecodedToken
    req.userId = decoded.id
    next()
  } catch (err) {
    console.error(err.message)
    return res.status(401).json({
      error: 'Authorization denied'
    })
  }
}
