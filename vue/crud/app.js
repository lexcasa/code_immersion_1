const API   = 'https://crudcrud.com/api/b7201d5e513548538d27513bbc331f69/'
const TIME_MODAL = 3000
const MODAL_MSG  = "Esta seguro que quiere eliminar el porducto?"

const app = new Vue({
    el: '#app',
    data: {
        producto: {
            nombre: '',
            precio: 0,
            activo: true
        },
        productos: [],
        isForm: true,
        isLoading: false,
        isSuccess: false
    },
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