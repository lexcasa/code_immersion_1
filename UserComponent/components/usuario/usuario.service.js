const Usuario = function (){
    const MODEL = 'usuarios'
    return {
        obtenerUsuarios: function (isActivo, success, error){
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
        upsertUsuario: function (usuario, success, error){
            let url = API + MODEL
             // Creando un usuario
             if(!usuario._id){
                // t= i+1
                axios.post(url, usuario).then( res => {
                    if(res.status === 201){
                        success({created: true})
                    } else {
                        success({created: false})
                    }
                })
            } else {
                url += '/' + usuario._id
                delete usuario._id

                axios.put(url, usuario).then( res => { // t = (i+1) + stime (ida - vuelta)
                    if(res.status === 200){
                        success({edited: true})
                    } else {
                        success({edited: false})
                    }
                })
            }
        
        },
        obtenerUsuarioPorId: function (id, success, error){
            let url = API + MODEL + '/' + id
            axios.get(url).then( res => {
                success(res.data) // {_id: 1232, ...}
            })
        },
        eliminarUsuarioPorId: function (id, success, error){
            let url = API + MODEL + '/' + id
            axios.delete(url).then( res => {
                success({deleted: true})
            })
        }
    }
}