import { UserModel } from '../models/userModel.js'
import { validateUserSchema } from '../schemas.js'
import bcrypt from 'bcrypt'
import { LOGIN_CODES } from '../utils.js'

export class UserController {
  static newUser = async (req, res) => {
    const { body } = req
    console.log(body)
    validateUserSchema(body)
    const { username, name, password } = body
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)
    console.log({ passwordHash })
    console.log(typeof username, typeof name, typeof password)
    const id = crypto.randomUUID()
    UserModel.newUser({ id, username, name, passwordHash }, (code, results) => {
      console.log(code)
      if (code === LOGIN_CODES.ERROR_USER_EXISTS) {
        return res.status(400).send({
          message: 'Usuario ya existe'
        })
      }

      if (code === LOGIN_CODES.AUTH_SUCCESS) {
        return res.status(200).json(results)
      }

      return res.status(500)
    })
  }
}
