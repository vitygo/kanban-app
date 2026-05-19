import { Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest } from '../middleware/auth.middleware'

export const getBoards = async (req: AuthRequest, res: Response) => {
  try {
    const boards = await prisma.board.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' },
    })
    return res.json(boards)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const createBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body
    const board = await prisma.board.create({
      data: { title, description, userId: req.userId! },
    })
    return res.status(201).json(board)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const getBoardById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const board = await prisma.board.findFirst({
      where: { id, userId: req.userId! },
      include: {
        columns: {
          orderBy: { order: 'asc' },
          include: {
            cards: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    })

    if (!board) return res.status(404).json({ error: 'Board not found' })

    return res.json(board)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    const board = await prisma.board.findFirst({
      where: { id, userId: req.userId! },
    })

    if (!board) return res.status(404).json({ error: 'Board not found' })

    const updated = await prisma.board.update({
      where: { id },
      data: { title, description },
    })

    return res.json(updated)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const board = await prisma.board.findFirst({
      where: { id, userId: req.userId! },
    })

    if (!board) return res.status(404).json({ error: 'Board not found' })

    await prisma.board.delete({ where: { id } })

    return res.status(204).send()
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}