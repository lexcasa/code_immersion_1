const dbService = require('./mysql.service')

const Productos = {
    obtenerTodos: async () => {
        const productos = await dbService.query('SELECT * FROM productos', [])
        return productos
    },
    obtenerProductoPorId: async (arrProds, id) => {
        console.log(id)
        const productos = await dbService.query('SELECT * FROM productos WHERE id = ?', [id])
        return productos.length > 0 ? productos[0] : undefined
    },
    crearProducto: async (producto) => {
        // 
        const query = `
            INSERT INTO productos (nombre)
            VALUES (?)
        `
        const insertProducto = await dbService.query(query, [producto.nombre])
        return insertProducto
    }
}
module.exports = Productos