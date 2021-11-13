const CompTodo = Vue.component('todo-list', {
    data: function (){
        return {
            item: '',
            lista: []
        }
    },
    template: `
        <div id="component--todo-list">
            <input type="text" v-model="item">
            <button v-on:click="agregar()">Agregar</button>
            <hr>
            <ul>
                <li v-for="(item, i) in lista">
                    <span v-bind:style="item.checked ? 'text-decoration: line-through' : ''">{{item.item}}</span>
                    <button v-on:click="completar(i)" v-bind:disabled="item.checked">Completar</button>
                    <button v-on:click="eliminar(i)" v-bind:disabled="item.checked">Eliminar</button>
                </li>
            </ul>
        </div>
    `,
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