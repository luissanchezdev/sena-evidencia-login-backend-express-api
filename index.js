import express from 'express'
import { loginRouter } from './routes/loginRouter.js'
import cors from 'cors'
import { planesRouter } from './routes/planesRouter.js'
import { registerRouter } from './routes/registerRouter.js'
import { PORT } from './db_connection.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Api con Express para evidencia SENA'
  })
})

app.use('/login', loginRouter)

app.use('/register', registerRouter)

app.use('/planes', planesRouter)

app.use((req, res, next) => {
  return res.status(404).send()
})

app.use((error, req, res, next) => {
  console.log(error.stack)
  res.status(500).send({
    message: 'Error en el servidor'
  })
})

app.listen(PORT, () => {
  console.log(`Proyecto funcionando en el puerto ${PORT}`)
})
