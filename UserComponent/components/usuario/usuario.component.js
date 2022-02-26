const CompUsuario = Vue.component('usuario-crud', function (cb){
    axios.get('./components/usuario/indexusuarios.html').then( res => {
        cb({
            data: function (){
                return {
                    usuario: {
                        nombre: '',
                        apellido: '',
                        email: '',
                        password: '',
                        masculino: false,
                        femenino: false,
                        edad: 0,
                        altura: 0,
                        peso: 0,
                        activo: true,
                        create: new Date()
                    },
                    usuarios: [],
                    isForm: true,
                    isLoading: false,
                    isSuccess: false
                }
            },
            template: res.data,
            methods: {
                showForm: function (){
                    this.isForm = true
                    this.usuario = {
                        nombre: '',
                        apellido: '',
                        email: '',
                        password: '',
                        masculino: false,
                        femenino: false,
                        edad: 0,
                        altura: 0,
                        peso: 0,
                        activo: true,
                        create: new Date()
                    }
                },
                // t= i
                guardaUsuario: function (){
                    const usuario = this.usuario
                    this.isLoading = true
        
                    Usuario().upsertUsuario(usuario, res => {
                        this.isLoading = false
                        this.usuario = {
                            nombre: '',
                            apellido: '',
                            email: '',
                            password: '',
                            masculino: false,
                            femenino: false,
                            edad: 0,
                            altura: 0,
                            peso: 0,
                            activo: true,
                            create: new Date()
                        }
        
                        if(res.edited){
                            console.log(res)
                        } else {
                            // Fue creado
                            console.log(res)
                        }
                    })
                },
                listarUsuarios: function (isActivo){
                    Usuario().obtenerUsuarios( isActivo, res => {
                        this.usuarios = res
                        this.isForm = false
                    }, error => {
                        alert(error.mensaje)
                    })
                },
                eliminarUsuario: function (id){
                    if(confirm(MODAL_MSG)){
                        Usuario().eliminarUsuarioPorId(id, res => {
                            if(res.deleted){
                                this.listarUsuarios()
                            }
                        })
                    }
                },
                seleccionarUsuario: function (id){ 
                    Usuario().obtenerUsuarioPorId(id, res => {
                        this.showForm()
                        this.usuario = res
                    })
                }    
            }
        })
    })
})