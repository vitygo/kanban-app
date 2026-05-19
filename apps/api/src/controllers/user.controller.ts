import { Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest } from '../middleware/auth.middleware'

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { id: true, name: true, email: true, createdAt: true },
    })

    if (!user) return res.status(404).json({ error: 'User not found' })

    return res.json(user)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateMe = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email } = req.body

    if (email) {
      const existing = await prisma.user.findFirst({
        where: { email, NOT: { id: req.userId! } },
      })
      if (existing) {
        return res.status(409).json({ error: 'Email already in use' })
      }
    }

    const user = await prisma.user.update({
      where: { id: req.userId! },
      data: { name, email },
      select: { id: true, name: true, email: true, createdAt: true },
    })

    return res.json(user)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}