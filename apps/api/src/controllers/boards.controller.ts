import { Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest } from '../middleware/auth.middleware'


export const getBoards = async (req: AuthRequest, res: Response) => {
  try {
    const boards = await prisma.board.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' }
    })
    res.json(boards)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}


export const createBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body
    const board = await prisma.board.create({
      data: { title, description, userId: req.userId! }
    })
    res.status(201).json(board)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}


export const getBoardById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const board = await prisma.board.findFirst({
      where: { id, userId: req.userId! }
    })
    if (!board) {
      return res.status(404).json({ error: 'Board not found' })
    }
    res.json(board)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { title, description } = req.body
    const board = await prisma.board.updateMany({
      where: { id, userId: req.userId! },
      data: { title, description }
    })
    res.json({ message: 'Board updated successfully' })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}


export const deleteBoard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    await prisma.board.deleteMany({
      where: { id, userId: req.userId! }
    })
    res.json({ message: 'Board deleted successfully' })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}