import { Router } from 'express'
import { UserController } from '../controllers.js/userController.js'

export const registerRouter = Router()

registerRouter.post('/', UserController.newUser)
