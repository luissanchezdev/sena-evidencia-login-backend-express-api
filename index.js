import express from 'express'
import { connection, PORT } from './db_connection.js'
import { z } from 'zod'
import cors from 'cors'
import bcrypt from 'bcrypt'

const app = express()

const userSchema = z.object({
  username: z.string({
    required_error: 'El campo username es requerido'
  }).regex(/^[A-Za-z0-9]+$/, 'El username no debe tener caracteres especiales'),
  name: z.string({
    required_error: 'El campo nombre es requerido',
    invalid_type_error: 'El nombre no debe tener numeros'
  }).refine((val) => isNaN(val), {
    message: 'El nombre no debe tener números o caracteres especiales'
  }),
  password: z.string({
    required_error: 'El campo contraseña es requerido'
  }).min(6)
})

const loginSchema = z.object({
  username: z.string({
    required_error: 'El campo username es requerido'
  }).regex(/^[A-Za-z0-9]+$/, 'El username no debe tener caracteres especiales'),
  password: z.string({
    required_error: 'El campo contraseña es requerido'
  })
})

const validateUserSchema = (object) => {
  return userSchema.safeParse(object)
}

const validateLoginSchema = (object) => {
  return loginSchema.safeParse(object)
}

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Api con Express para evidencia SENA'
  })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const result = validateLoginSchema(req.body)
  // console.log({ result })
  if (result.error) {
    return res.status(400).send(result.error.issues)
  }

  connection.query(
    'SELECT * FROM usuarios WHERE username = ?', [username],
    async function (err, results, fields) {
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

      const passwordHashed = results[0].password

      const validatePasswordHash = await bcrypt.compare(password, passwordHashed)
      console.log({ validatePasswordHash })
      if (!validatePasswordHash) {
        return res.status(401).send({
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

app.post('/register', async (req, res) => {
  const { body } = req
  console.log(body)
  validateUserSchema(body)
  const { username, name, password } = body
  const saltRounds = 12
  const passwordHash = await bcrypt.hash(password, saltRounds)
  console.log({ passwordHash })
  console.log(typeof username, typeof name, typeof password)
  const id = crypto.randomUUID()
  connection.query(
    'INSERT INTO usuarios (id, username, name, password) VALUES (?, ?, ?, ?)', [id, username, name, passwordHash],
    function (err, results, fields) {
      console.log({ err })
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log({ err })
          console.log('Error en la consulta a la base de datos')
          return res.status(401).send({
            message: 'Usuario ya existe'
          })
        } else {
          return res.status(400).send()
        }
      }

      console.log({ results })
      if (results.length === 0) {
        console.log('0 coincidencias de usuarios')
        return res.status(401).json({
          message: 'Datos incorrectos'
        })
      }

      console.log({ results })

      return res.status(202).json({
        message: 'Registro exitoso',
        user: {
          username,
          name,
          password
        }
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
