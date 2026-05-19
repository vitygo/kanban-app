import { Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest } from '../middleware/auth.middleware'

export const createColumn = async (req: AuthRequest, res: Response) => {
  try {
    const { id: boardId } = req.params
    const { title } = req.body

    const board = await prisma.board.findFirst({
      where: { id: boardId, userId: req.userId! },
    })

    if (!board) return res.status(404).json({ error: 'Board not found' })

    const lastColumn = await prisma.column.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
    })

    const order = lastColumn ? lastColumn.order + 1 : 1

    const column = await prisma.column.create({
      data: { title, boardId, order },
    })

    return res.status(201).json(column)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateColumn = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { title, wipLimit } = req.body

    const column = await prisma.column.findFirst({
      where: { id },
      include: { board: true },
    })

    if (!column || column.board.userId !== req.userId!) {
      return res.status(404).json({ error: 'Column not found' })
    }

    const updated = await prisma.column.update({
      where: { id },
      data: { title, wipLimit },
    })

    return res.json(updated)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const reorderColumns = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { ids } = req.body

    const board = await prisma.board.findFirst({
      where: { id, userId: req.userId! },
    })

    if (!board) return res.status(404).json({ error: 'Board not found' })

    await Promise.all(
      ids.map((columnId: string, index: number) =>
        prisma.column.update({
          where: { id: columnId },
          data: { order: index + 1 },
        })
      )
    )

    return res.json({ success: true })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteColumn = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const column = await prisma.column.findFirst({
      where: { id },
      include: { board: true },
    })

    if (!column || column.board.userId !== req.userId!) {
      return res.status(404).json({ error: 'Column not found' })
    }

    await prisma.column.delete({ where: { id } })

    return res.status(204).send()
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}