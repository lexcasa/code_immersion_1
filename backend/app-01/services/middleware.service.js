const dbService = require('./mysql.service')
const Usuario   = require('./usuarios.service')

const Middleware = {
    verifyToken: async function (req, res, next){
        const auth = req.headers['authorization']
        const isValidToken = await Usuario.validToken(auth, false, false)

        if(isValidToken){
            next()
        } else {
            res.status(401).send({error: 'No puedes acceder'})
        }
    },
    verifyAdminToken: async function (req, res, next){
        const auth = req.headers['authorization']
        const isValidToken = await Usuario.validToken(auth, true, true)

        if(isValidToken){
            next()
        } else {
            res.status(403).send({error: 'Tu usuario no tiene permisos de Admin'})
        }
    }
}

module.exports = Middleware