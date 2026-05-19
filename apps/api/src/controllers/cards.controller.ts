import { Response } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest } from '../middleware/auth.middleware'

export const createCard = async (req: AuthRequest, res: Response) => {
  try {
    const { id: columnId } = req.params
    const { title, description, priority, dueDate } = req.body

    const column = await prisma.column.findFirst({
      where: { id: columnId },
      include: { board: true },
    })

    if (!column || column.board.userId !== req.userId!) {
      return res.status(404).json({ error: 'Column not found' })
    }

    const lastCard = await prisma.card.findFirst({
      where: { columnId },
      orderBy: { order: 'desc' },
    })

    const order = lastCard ? lastCard.order + 1 : 1

    const card = await prisma.card.create({
      data: {
        title,
        description,
        priority: priority ?? 'medium',
        dueDate: dueDate ? new Date(dueDate) : undefined,
        columnId,
        order,
      },
    })

    return res.status(201).json(card)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateCard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, priority, dueDate } = req.body

    const card = await prisma.card.findFirst({
      where: { id },
      include: { column: { include: { board: true } } },
    })

    if (!card || card.column.board.userId !== req.userId!) {
      return res.status(404).json({ error: 'Card not found' })
    }

    const updated = await prisma.card.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    })

    return res.json(updated)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const moveCard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { columnId, order } = req.body

    const card = await prisma.card.findFirst({
      where: { id },
      include: { column: { include: { board: true } } },
    })

    if (!card || card.column.board.userId !== req.userId!) {
      return res.status(404).json({ error: 'Card not found' })
    }

    const updated = await prisma.card.update({
      where: { id },
      data: { columnId, order },
    })

    return res.json(updated)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteCard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const card = await prisma.card.findFirst({
      where: { id },
      include: { column: { include: { board: true } } },
    })

    if (!card || card.column.board.userId !== req.userId!) {
      return res.status(404).json({ error: 'Card not found' })
    }

    await prisma.card.delete({ where: { id } })

    return res.status(204).send()
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}