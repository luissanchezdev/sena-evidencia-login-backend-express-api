import { PlanesModel } from '../models/planesModel.js'
import { PLANES_CODES } from '../utils.js'

export class PlanesController {
  static getAll = async (req, res) => {
    try {
      PlanesModel.getAllPlanes((code, results) => {
        if (code === PLANES_CODES.NOT_FOUND) {
          return res.status(404).send()
        }

        if (code === PLANES_CODES.GET_ALL) {
          return res.status(200).json(results)
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}
