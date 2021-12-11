const Producto = function (){
    const MODEL = 'productos'
    return {
        obtenerProductos: function (isActivo, success, error){
            let url = API + MODEL
            axios.get(url).then( res => {
                if(isActivo === true){
                    success(
                        res.data.filter( item => item.activo == true)
                    )
                } else {
                    success(res.data)
                }
            }).catch( err => {
                error({mensaje: "Error de servicio"})
            })
        },
        upsertProducto: function (producto, success, error){
            let url = API + MODEL
             // Creando un producto
             if(!producto._id){
                // t= i+1
                axios.post(url, producto).then( res => {
                    if(res.status === 201){
                        success({created: true})
                    } else {
                        success({created: false})
                    }
                })
            } else {
                url += '/' + producto._id
                delete producto._id

                axios.put(url, producto).then( res => { // t = (i+1) + stime (ida - vuelta)
                    if(res.status === 200){
                        success({edited: true})
                    } else {
                        success({edited: false})
                    }
                })
            }
        },
        obtenerProductoPorId: function (id, success, error){
            let url = API + MODEL + '/' + id
            axios.get(url).then( res => {
                success(res.data) // {_id: 1232, ...}
            })
        },
        eliminarProductoPorId: function (id, success, error){
            let url = API + MODEL + '/' + id
            axios.delete(url).then( res => {
                success({deleted: true})
            })
        }
    }
}