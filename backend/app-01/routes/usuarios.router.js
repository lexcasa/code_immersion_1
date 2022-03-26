const express = require('express')
const router  = express.Router()

router.post('/register', async (req, res) => {
    const body = req.body
    const Usuario = require('../services/usuarios.service')
    const response  = await Usuario.registro(body)

    if(response.error){
        res.send({error: response.error})
    } else {
        res.send({response: response})
    }
})

router.post('/login', async (req, res) => {
    const body = req.body
    const Usuario = require('../services/usuarios.service')
    const response  = await Usuario.login(body)

    if(response.error){
        res.send({error: response.error})
    } else {
        res.send({response: response})
    }
})

module.exports = router