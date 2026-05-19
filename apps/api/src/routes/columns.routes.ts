import { Router } from 'express'
import {
  createColumn,
  updateColumn,
  reorderColumns,
  deleteColumn,
} from '../controllers/columns.controller'
import { validate } from '../middleware/validate.middleware'
import {
  createColumnSchema,
  updateColumnSchema,
  reorderColumnsSchema,
} from '../schemas/column.schema'

export const columnsRouter = Router()

columnsRouter.post('/boards/:id/columns', validate(createColumnSchema), createColumn)
columnsRouter.patch('/columns/:id', validate(updateColumnSchema), updateColumn)
columnsRouter.patch('/boards/:id/columns/reorder', validate(reorderColumnsSchema), reorderColumns)
columnsRouter.delete('/columns/:id', deleteColumn)