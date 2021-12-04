const API   = 'https://crudcrud.com/api/b7201d5e513548538d27513bbc331f69/'
const TIME_MODAL = 3000
const MODAL_MSG  = "Esta seguro que quiere eliminar el porducto?"

const app = new Vue({
    el: '#app',
    data: {
        titulo: "Hola!"
    },
    components: {
        'producto-crud': CompProducto
    }
})