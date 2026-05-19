import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.routes'
import { boardsRouter } from './routes/boards.routes'
import { columnsRouter } from './routes/columns.routes'
import { cardsRouter } from './routes/cards.routes'
import { authMiddleware } from './middleware/auth.middleware'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth', authRouter)

app.use('/api', authMiddleware)
app.use('/api', columnsRouter)
app.use('/api', cardsRouter)
app.use('/api/boards', boardsRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})