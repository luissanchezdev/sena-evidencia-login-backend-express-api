import { connection } from '../db_connection.js'
import { PLANES_CODES } from '../utils.js'

export class PlanesModel {
  static async getAllPlanes (fn) {
    connection.query(
      'SELECT * FROM planes',
      function (err, results, fields) {
        if (err) {
          fn(PLANES_CODES.NOT_FOUND, [])
          return
        }
        fn(PLANES_CODES.GET_ALL, results)
      }
    )
  }
}
