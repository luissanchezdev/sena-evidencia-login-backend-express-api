import express from 'express'
import { connection, PORT } from './db_connection.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Api con Express para evidencia SENA'
  })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  connection.query(
    'SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password],
    function (err, results, fields) {
      if (err) {
        console.log({ err })
        console.log('Error en la consulta a la base de datos')
        return res.status(500).send()
      }

      console.log({ results })
      if (results.length === 0) {
        return res.status(401).json({
          message: 'Usuario no autorizado'
        })
      }

      return res.status(202).json({
        message: 'Autenticación exitosa',
        user: results[0]
      })
    }
  )
})

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
