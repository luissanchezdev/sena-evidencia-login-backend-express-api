import express from 'express'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT ?? 4000

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to API express'
  })
})

app.listen(PORT, () => {
  console.log(`Proyecto funcionando en el puerto ${PORT}`)
})
