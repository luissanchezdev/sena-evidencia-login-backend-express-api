import { connection } from '../db_connection.js'
import { LOGIN_CODES } from '../utils.js'

export class UserModel {
  static newUser = async (dataUser, fn) => {
    const { id, username, name, passwordHash } = dataUser

    connection.query(
      'INSERT INTO usuarios (id, username, name, password) VALUES (?, ?, ?, ?)', [id, username, name, passwordHash],
      function (err, results, fields) {
        console.log({ err })
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.log({ err })
            console.log('Error en la consulta a la base de datos')
            fn(LOGIN_CODES.ERROR_USER_EXISTS, {})
            return
          } else {
            fn(LOGIN_CODES.DB_ERROR, {})
            return
          }
        }

        console.log({ results })

        fn(LOGIN_CODES.AUTH_SUCCESS, {
          message: 'Registro exitoso',
          user: {
            username,
            name,
            password: passwordHash
          }
        })
      }
    )
  }
}
