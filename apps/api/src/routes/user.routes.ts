import { Router } from 'express'
import { getMe, updateMe } from '../controllers/user.controller'
import { validate } from '../middleware/validate.middleware'
import { updateUserSchema } from '../schemas/user.schema'

export const userRouter = Router()

userRouter.get('/me', getMe)
userRouter.patch('/me', validate(updateUserSchema), updateMe)