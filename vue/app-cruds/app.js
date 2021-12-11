const API   = 'https://crudcrud.com/api/420a2569eb254ade814eab2e81b91986/'
const TIME_MODAL = 3000
const MODAL_MSG  = "Esta seguro que quiere eliminar el porducto?"

const routes = [
    {path: '/', component: CompLogin},
    {path: '/productos', component: CompProducto},
    {path: '/productos/new', component: CompProductoForm},
    {path: '/productos/:id', component: CompProductoForm}
]

const router = new VueRouter({
    routes
})


const app = new Vue({
    router: router, // {router: router} 
    data: {
        title: "Hola!"
    }
}).$mount('#app')