const CompProducto = Vue.component('producto-crud', function (cb){
    axios.get('./components/producto/indexView.html').then( res => {
        cb({
            data: function (){
                return {
                    producto: {
                        nombre: '',
                        precio: 0,
                        activo: true
                    },
                    productos: [],
                    isForm: true,
                    isLoading: false,
                    isSuccess: false
                }
            },
            template: res.data,
            methods: {
                showForm: function (){
                    this.isForm = true
                    this.producto = {
                        nombre: '',
                        precio: 0,
                        activo: true
                    }
                },
                // t= i
                guardaProducto: function (){
                    const producto = this.producto
                    this.isLoading = true
        
                    Producto().upsertProducto(producto, res => {
                        this.isLoading = false
                        this.producto = {
                            nombre: '',
                            precio: 0,
                            activo: true
                        }
        
                        if(res.edited){
                            console.log(res)
                        } else {
                            // Fue creado
                            console.log(res)
                        }
                    })
                },
                listarProductos: function (isActivo){
                    Producto().obtenerProductos( isActivo, res => {
                        this.productos = res
                        this.isForm = false
                    }, error => {
                        alert(error.mensaje)
                    })
                },
                eliminarProducto: function (id){
                    if(confirm(MODAL_MSG)){
                        Producto().eliminarProductoPorId(id, res => {
                            if(res.deleted){
                                this.listarProductos()
                            }
                        })
                    }
                },
                seleccionarProducto: function (id){ 
                    Producto().obtenerProductoPorId(id, res => {
                        this.showForm()
                        this.producto = res
                    })
                }
            }
        })
    })
})