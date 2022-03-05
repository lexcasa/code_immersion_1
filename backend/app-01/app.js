const express       = require('express')
const bodyParser    = require('body-parser')
const app = express()
const port = 3000

// Estado: (url, verbo)
// (localhost:3000/, GET)
app.get('/', (req, res) => {
  res.send('Alex!')
})

app.use(bodyParser.json())
// Productos
app.get('/productos', async (req, res) => {
    const Productos = require('./services/productos.service')
    const arrProds  = await Productos.obtenerTodos()

    res.send({ response: arrProds })
})

app.get('/productos/:id', async (req, res) => {
    const id = req.params.id
    const Productos = require('./services/productos.service')
    const arrProds  = await Productos.obtenerTodos()
    const producto  = await Productos.obtenerProductoPorId( arrProds, id)

    res.send({ response: producto })
})

app.post('/productos', async (req, res) => {
    const body = req.body
    const Productos = require('./services/productos.service')
    const response  = await Productos.crearProducto(body)
    res.send({response: response})
})

// Levanta un webserver
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})