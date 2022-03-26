const express = require('express')
const router  = express.Router()
const {verifyToken, verifyAdminToken} = require('../services/middleware.service')

// Productos
// GET /productos/all
router.get('/all', async (req, res) => {
    const Productos = require('../services/productos.service')
    const arrProds  = await Productos.obtenerTodos()

    res.send({ response: arrProds })
})

// GET /productos/1
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const Productos = require('../services/productos.service')
    const arrProds  = await Productos.obtenerTodos()
    const producto  = await Productos.obtenerProductoPorId( arrProds, id)

    if(producto){
        res.send({ response: producto })
    } else {
        res.send({ error: 'Producto no encontrado' })
    }  
})

// POST /productos/new

router.post('/new', verifyAdminToken, async (req, res) => {
    const body = req.body
    const Productos = require('../services/productos.service')
    const response  = await Productos.crearProducto(body)
    res.send({response: response})
})

module.exports = router