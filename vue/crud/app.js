const API   = 'https://crudcrud.com/api/fc3df8c9561146af92e4d6f6f29f7a50/'
const MODEL = 'productos'
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
        },
        // t= i
        guardaProducto: function (){
            console.log("producto :: ", this.producto)
            let url = API + MODEL
            const producto = this.producto
            
             // t= i+1
            this.isLoading = true

            // t= i+1
            axios.post(url, producto).then( res => { // t = (i+1) + stime (ida - vuelta)
                // t = (15000ms+1) + (952ms) + 1
                console.log("server res: ", res)
                this.isLoading = false
                if(res.status === 201){
                    this.isSuccess = true

                    this.producto = {
                        nombre: '',
                        precio: 0,
                        activo: true
                    }

                    // En que monento desaparece el cartel
                    setTimeout( () => {
                        this.isSuccess = false
                    }, TIME_MODAL)
                }
            })
        },
        listarProductos: function (){
            let url = API + MODEL
            this.isForm = false
            axios.get(url).then( res => {
                this.productos = res.data
            })
        },
        eliminarProducto: function (id){
            let url = API + MODEL + '/' + id
            if(confirm(MODAL_MSG)){
                axios.delete(url).then( res => {
                    console.log("res: ", res)

                    // Llamar la funcion que actualiza la lista
                    this.listarProductos()
                })
            }
        }
    }
})