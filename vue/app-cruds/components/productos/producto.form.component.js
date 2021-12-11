const CompProductoForm = Vue.component('producto-form', function (cb){
    axios.get('./components/productos/formView.html').then( res => {
        cb({
            data: function (){
                return {
                    producto: {
                        nombre: '',
                        precio: 0,
                        activo: true
                    },
                    isLoading: false,
                    isSuccess: false,
                    menuItems: [
                        {name: "+ Producto", link: '/productos/new'},
                        {name: "Listar", link: '/productos'}
                    ]
                }
            },
            template: res.data,
            methods: {
                resetForm: function (){
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
                        this.resetForm()
        
                        if(res.edited){
                            console.log(res)
                        } else {
                            // Fue creado
                            console.log(res)
                        }
                        app.$router.push('/productos')
                    })
                },
                seleccionarProducto: function (id){ 
                    Producto().obtenerProductoPorId(id, res => {
                        this.resetForm()
                        this.producto = res
                    })
                }
            },
            components: {
                'menu-prods': CompMenuProductos
            },
            mounted: function (){
                if(app.$route.params.id){
                    const id = app.$route.params.id
                    this.seleccionarProducto(id)
                }
            }
        })
    })
})