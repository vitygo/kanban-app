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
      return res.status(409).json({ error: 'Email вже використовується' })
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
  
      // Однакова помилка для "немає юзера" і "неправильний пароль"
      // — не даємо зрозуміти чи існує акаунт
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ error: 'Невірний email або пароль' })
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
      // verifyRefreshToken кидає помилку якщо токен протермінований або невалідний
      return res.status(401).json({ error: 'Invalid refresh token' })
    }
  }
  
  // POST /api/auth/logout
  export const logout = (_req: Request, res: Response) => {
    // З JWT на бекенді немає стану — просто повертаємо 204
    // Фронт сам видаляє токени зі сховища
    return res.status(204).send()
  }