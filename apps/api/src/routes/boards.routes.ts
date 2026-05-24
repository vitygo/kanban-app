import { Router } from 'express'
import { getBoards, createBoard, getBoardById, updateBoard, deleteBoard } from '../controllers/boards.controller'

export const boardsRouter = Router()

boardsRouter.get('/boards', getBoards)
boardsRouter.post('/boards', createBoard)
boardsRouter.get('/boards/:id', getBoardById)
boardsRouter.patch('/boards/:id', updateBoard)
boardsRouter.delete('/boards/:id', deleteBoard)