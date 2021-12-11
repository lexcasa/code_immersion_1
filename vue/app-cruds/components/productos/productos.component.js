const CompProducto = Vue.component('producto-crud', function (cb){
    axios.get('./components/productos/indexView.html').then( res => {
        cb({
            data: function (){
                return {
                    productos: [],
                    menuItems: [
                        {name: "+ Producto", link: '/productos/new'}
                    ]
                }
            },
            template: res.data,
            methods: {
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
                }
            },
            mounted: function (){
                this.listarProductos()
            },
            components: {
                'menu-prods': CompMenuProductos
            }
        })
    })
})