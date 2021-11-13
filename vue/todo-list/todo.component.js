const CompTodo = Vue.component('todo-list', function (cb){
    axios.get('./todo-list/todo.view.html').then( res => {
        cb({
            data: function (){
                return {
                    item: '',
                    lista: []
                }
            },
            template: res.data,
            methods: {
                agregar: function (){
                    this.lista.push({item: this.item, checked: false})
                },
                eliminar: function (indice){
                    console.log("posicion elemento lista: ", indice)
                    this.lista.splice(indice, 1)
                },
                completar: function (indice){
                    // this.$set(this.lista[indice], 'checked', true);
                    this.lista[indice].checked = true
                    console.log("lista: ", this.lista)
                }
            }
        })
    })
})