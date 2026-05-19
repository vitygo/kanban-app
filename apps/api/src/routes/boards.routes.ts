import { Router } from 'express'
import { getBoards, createBoard, getBoardById, updateBoard, deleteBoard } from '../controllers/boards.controller'

export const boardsRouter = Router()

boardsRouter.get('/', getBoards)
boardsRouter.post('/', createBoard)
boardsRouter.get('/:id', getBoardById)
boardsRouter.patch('/:id', updateBoard)
boardsRouter.delete('/:id', deleteBoard)
