const CompMenuProductos = Vue.component('menu-productos', {
    // [{link, name}]
    props: ['arrLinks'],
    template: `
        <div id="menu--productos">
            <router-link class="btn btn-primary" v-for="(item, i) in arrLinks" v-bind:to="item.link" :key="i">{{item.name}}</router-link>
        </div>
    `,
    mounted: function (){
        console.log(this.arrLinks)
    }
})