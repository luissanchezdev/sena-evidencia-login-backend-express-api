import { Router } from 'express'
import { LoginController } from '../controllers.js/loginController.js'

export const loginRouter = Router()

loginRouter.post('/', LoginController.auth)
