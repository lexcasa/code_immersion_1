const express       = require('express')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const Productos     = require('./routes/productos.router')
const Usuarios      = require('./routes/usuarios.router')

const app = express()
const port = 3000

// Estado: (url, verbo)
// (localhost:3000/, GET)
app.get('/', (req, res) => {
  res.send('Alex!')
})
app.use(cors())
app.use(bodyParser.json())

// Ruteo de productos
app.use('/productos', Productos)

// Ruteo de usuarios
app.use('/usuarios', Usuarios)

// Levanta un webserver
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})