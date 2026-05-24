import { Router } from 'express'
import { getMe, updateMe, changePassword } from '../controllers/user.controller'
import { validate } from '../middleware/validate.middleware'
import { updateUserSchema, changePasswordSchema } from '../schemas/user.schema'

export const userRouter = Router()

userRouter.get('/me', getMe)
userRouter.patch('/me', validate(updateUserSchema), updateMe)
userRouter.post('/me/password', validate(changePasswordSchema), changePassword)


