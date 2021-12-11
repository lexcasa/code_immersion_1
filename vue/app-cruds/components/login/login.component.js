const CompLogin = Vue.component('comp-login', function (cb){
    axios.get('./components/login/indexView.html').then( res => {
        cb({
            template: res.data,
            data: function (){
                return {

                }
            },
            methods: {
                login: function (){
                    app.$router.push('/productos')
                }
            }
        })
    })
})