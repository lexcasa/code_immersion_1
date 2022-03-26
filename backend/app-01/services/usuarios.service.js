const dbService = require('./mysql.service')
const md5       = require('md5')
const { use } = require('../routes/productos.router')

const Usuario = {
    registro: async function (usuario) {
        // 
        // 1. Verificar que el usuario exista en la base
        // 2. Verificar que todos los campos tienen contenido
        // 3. Hacer el hash de la clave
        let notExistUser    = await this.notExistUser(usuario.email)
        let notEmptyFields  = this.notEmptyField(usuario.nombre) && this.notEmptyField(usuario.email) && this.notEmptyField(usuario.clave)

        if(notExistUser && notEmptyFields){
            const query = `
                INSERT INTO usuarios (nombre, email, clave)
                VALUES (?,?,?)
            `
            const clave = md5(usuario.clave)
            const insertUsuario = await dbService.query(query, [usuario.nombre, usuario.email, clave])
            return insertUsuario
        
        } else {
            return {
                error: 'El usuario ya existe y/o campos no validos'
            }
        }
    },
    login: async function (usuario){
        // 1. Verificar que los campos no esten vacios
        // 2. email y clave (con hash) esten en la base datos
        // 3. En el caso que exista enviar un token de authenticacion
            // El token lo vamos a guardar en la base de datos
            // Generado a partir de la funcion tokenGenerator
        
        let notEmptyFields  = this.notEmptyField(usuario.email) && this.notEmptyField(usuario.clave)

        if(notEmptyFields){
            const clave = md5(usuario.clave)
            const query = `
                SELECT id, nombre, email, clave FROM usuarios WHERE email = ? AND clave = ?
            `
            const userExist = await dbService.query(query, [usuario.email, clave])

            // Usuario fue encontrado
            if(userExist.length > 0){
                // aplanar el objeto userExist
                const user = {...userExist[0]}
                const tokenResp = await this.tokenUpdate(user.id, user.email, user.clave)

                // Si el token se genero correctamente
                if(tokenResp.token){

                    // Elimino la clave del objeto user
                    delete user.clave

                    return {
                        token: tokenResp.token,
                        user: user
                    }
                }
            } else {
                return {
                    error: 'Usuario y/o clave incorrecta'
                }
            }
        } else {
            return {
                error: 'Campos no validos'
            }
        }
    },
    notExistUser: async function (email) {
        const query = `
            SELECT * FROM usuarios WHERE email = ?
        `

        const userExist = await dbService.query(query, [email])
        return userExist.length > 0 ? false : true
    },
    notEmptyField: function (field) {
        return field.trim().length > 0 ? true : false
    },
    tokenGenerator: function (something){
        const seed  = "alex.123.xela"
        const rand  = Math.random()
        const token = md5(something + seed + rand).toUpperCase()
        return token
    },
    tokenUpdate: async function (id, clave, email){
        const token     = this.tokenGenerator(clave + email)
        const tokenTTE  = 30

        const query = `
            UPDATE usuarios SET token = ?, tokenTTE = ?, tokenDate = NOW() WHERE id = ?
        `
        const insertToken = await dbService.query(query, [token, tokenTTE, id])
        return insertToken.affectedRows && insertToken.affectedRows > 0 ? {token: token} : false
    },
    validToken: async function (token, isAdmin, verifyTTE){
        let compQuery   = ''
        let compAliases = ''
        let compHaving  = ''

        if(isAdmin){
            compQuery = ' AND isAdmin = 1'
        }

        if(verifyTTE){
            compAliases = '(tokenTTE - (TIME_TO_SEC(NOW()) - TIME_TO_SEC(tokenDate))/60) > 0 AS diffDate'
            compHaving  = 'HAVING (diffDate = 1)'
        }

        let query = `
            SELECT *, ${compAliases} FROM usuarios WHERE token = ? AND active = 1 ${compQuery}
            ${compHaving}
        `
        console.log(query)
        const userExist = await dbService.query(query, [token])
        return userExist.length > 0 ? true : false
    }
}
module.exports = Usuario