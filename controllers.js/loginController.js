import { validateLoginSchema } from '../schemas.js'
import { LoginModel } from '../models/loginModel.js'
import { LOGIN_CODES } from '../utils.js'

export class LoginController {
  static async auth (req, res) {
    const { username, password } = req.body
    const result = validateLoginSchema(req.body)
    if (result.error) {
      return res.status(400).send(result.error.issues)
    }

    LoginModel.auth({ username, password }, (code, results) => {
      if (code === LOGIN_CODES.DB_ERROR) {
        return res.status(500).send()
      }

      if (code === LOGIN_CODES.USER_NOT_FOUND) {
        return res.status(401).json({
          message: 'Datos incorrectos'
        })
      }

      if (code === LOGIN_CODES.ERROR_PASSWORD) {
        return res.status(401).json({
          message: 'Datos incorrectos'
        })
      }

      if (code === LOGIN_CODES.AUTH_SUCCESS) {
        return res.status(200).json(results)
      }
    })
  }
}
