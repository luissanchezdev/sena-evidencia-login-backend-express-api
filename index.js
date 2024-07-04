import express from 'express'
import { connection, PORT } from './db_connection.js'
import { z } from 'zod'
import cors from 'cors'

const app = express()

const userSchema = z.object({
  username: z.string({
    required_error: 'El campo username es requerido'
  }).regex(/^[A-Za-z0-9]+$/, 'El username no debe tener caracteres especiales'),
  password: z.string({
    required_error: 'El campo contraseña es requerido'
  })
})

const validateSchema = (object) => {
  return userSchema.safeParse(object)
}

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Api con Express para evidencia SENA'
  })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  const result = validateSchema(req.body)
  // console.log({ result })
  if (result.error) {
    return res.status(400).send(result.error.issues)
  }
  connection.query(
    'SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password],
    function (err, results, fields) {
      if (err) {
        console.log('Error en la consulta a la base de datos')
        return res.status(500).send()
      }

      console.log({ results })
      if (results.length === 0) {
        console.log('0 coincidencias de usuarios')
        return res.status(401).json({
          message: 'Datos incorrectos'
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
