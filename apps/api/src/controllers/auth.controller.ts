import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/tokens'
import type { RegisterInput, LoginInput } from '../schemas/auth.schema'

// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as RegisterInput

  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({ error: 'Email is in use' })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    })

    const accessToken = signAccessToken(user.id)
    const refreshToken = signRefreshToken(user.id)

    return res.status(201).json({
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

  // POST /api/auth/login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginInput
  
    try {
      const user = await prisma.user.findUnique({ where: { email } })
  
  
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ error: 'wrong email or passwordd' })
      }
  
      const accessToken = signAccessToken(user.id)
      const refreshToken = signRefreshToken(user.id)
  
      return res.json({
        accessToken,
        refreshToken,
        user: { id: user.id, name: user.name, email: user.email },
      })
    } catch {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  // POST /api/auth/refresh
export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body
  
    try {
      const payload = verifyRefreshToken(refreshToken)
  
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      })
  
      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }
  
      const accessToken = signAccessToken(user.id)
      const newRefreshToken = signRefreshToken(user.id)
  
      return res.json({ accessToken, refreshToken: newRefreshToken })
    } catch {

      return res.status(401).json({ error: 'Invalid refresh token' })
    }
  }
  

  export const logout = (_req: Request, res: Response) => {

    return res.status(204).send()
  }