import 'dotenv/config'
import mysql from 'mysql2'

const PORT = process.env.PORT ?? 4000
const DB = process.env.DB
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

// Configurar la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB
})

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ', err)
    return
  }
  console.log('Conexión exitosa a la base de datos')
})

export {
  PORT,
  DB,
  DB_USER,
  DB_PASSWORD,
  connection
}
