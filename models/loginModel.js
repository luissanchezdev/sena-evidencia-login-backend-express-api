import { connection } from '../db_connection.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { LOGIN_CODES } from '../utils.js'

export class LoginModel {
  static auth (dataUser, fn) {
    const { username, password } = dataUser
    connection.query(
      'SELECT u.username, u.name, u.password, p.id, p.name plan_name, p.price FROM usuarios u JOIN planes p ON u.plan_id = p.id WHERE username = ? ', [username],
      async function (err, results, fields) {
        if (err) {
          console.log('Error en la consulta a la base de datos')
          // fn es el callback pasado para recuperar la respuesta, debido a que la implementación de la libreria mysql2 esta usando callback y no promises
          fn(LOGIN_CODES.DB_ERROR, err)
          return
        }

        console.log({ results })
        if (results.length === 0) {
          console.log('0 coincidencias de usuarios')
          fn(LOGIN_CODES.USER_NOT_FOUND, [])
          return
        }

        const passwordHashed = results[0].password

        const validatePasswordHash = await bcrypt.compare(password, passwordHashed)
        console.log({ validatePasswordHash })
        if (!validatePasswordHash) {
          fn(LOGIN_CODES.ERROR_PASSWORD, {})
          return
        }

        const dataForToken = {
          name: results[0].name,
          username: results[0].username,
          password: passwordHashed
        }

        const token = jwt.sign(dataForToken, process.env.SECRET)

        fn(LOGIN_CODES.AUTH_SUCCESS, {
          user: { ...results[0], token: `bearer ${token}` }
        })
      }
    )
  }
}
