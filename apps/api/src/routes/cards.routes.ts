import { Router } from 'express'
import {
  createCard,
  updateCard,
  moveCard,
  deleteCard,
} from '../controllers/cards.controller'
import { validate } from '../middleware/validate.middleware'
import {
  createCardSchema,
  updateCardSchema,
  moveCardSchema,
} from '../schemas/card.schema'

export const cardsRouter = Router()

cardsRouter.post('/columns/:id/cards', validate(createCardSchema), createCard)
cardsRouter.patch('/cards/:id', validate(updateCardSchema), updateCard)
cardsRouter.patch('/cards/:id/move', validate(moveCardSchema), moveCard)
cardsRouter.delete('/cards/:id', deleteCard)