Vue.component('movie-card',{
    props: ['image', 'title'],
    template: `
    <div>
    <img width="100" :src="image"  :alt="title"/>
    <h2> {{ title }} </h2>
    </div>
    `
})


new Vue({
    el: '#app',
    data: {
        movies: [
            {title:'Regreso al futuro', image:'https://es.web.img3.acsta.net/pictures/14/03/11/10/30/351336.jpg' },
            {title:'Terminaitor', image:'https://m.media-amazon.com/images/I/71Yd98vOJTL._AC_SY445_.jpg'},
            {title:'Matrix', image:'https://pics.filmaffinity.com/Matrix-155050517-large.jpg'}
        ]
    },
    template: `
    <div>
    <movie-card v-for="(movie, index) in movies"
    :key="index"
    :title ="movie.title"
    :image="movie.image"
    ></movie-card>  
    </div>
    `
})