import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.routes'
import { boardsRouter } from './routes/boards.routes'
import { columnsRouter } from './routes/columns.routes'
import { cardsRouter } from './routes/cards.routes'
import { authMiddleware } from './middleware/auth.middleware'
import { userRouter } from './routes/user.routes'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth', authRouter)

app.use('/api', authMiddleware)
app.use('/api', userRouter)
app.use('/api', columnsRouter)
app.use('/api', cardsRouter)
app.use('/api', boardsRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})