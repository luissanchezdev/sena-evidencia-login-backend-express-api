import { Router } from 'express'
import { PlanesController } from '../controllers.js/planesController.js'

export const planesRouter = Router()

planesRouter.get('/', PlanesController.getAll)
