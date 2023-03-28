// src/components/Info.vue
<template>
  <div class="Info">
    <div class>
      <div class="row">
        <div class="col-12 d-flex flex-wrap">
          <div class="col-lg-2 col-md-3 col-sm-4 col-5 mb-4" v-for="(movie, key) in movieList" :key="key">
            <div class="card">
              <img :src="getPoster(key)" class="card-img-top" id="PosterImg">
              <div class="card-body">
                <h5 class="card-title">{{movie.title}}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Weather',
  data () {
    return {
      movieList: {},
      title: this.$route.params.title

    }
  },
  created () {
    let apikey = 'e4812b0763e5a2d97cbb969c192759a7'
    let infoUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + apikey + '&query=' + this.title;
    axios.get(infoUrl)
    .then((response) => {
      this.movieList = response.data.results;
      console.log(this.movieList);
    })
    .catch((error)=>{
      console.log(error)
    })
  },
  methods: {
    getPoster (key){
      if(this.movieList[key].poster_path != null){
        return 'https://image.tmdb.org/t/p/original' + this.movieList[key].poster_path
      }
      else return 'https://via.placeholder.com/500x750?text=Poster+Not+Available'
    }
  }
}
</script>
<style scoped>
.Info {
  color: black;
  font-family: "Tilt Warp";
  text-align: center;
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin-right: 10px;
  margin-bottom: 10px;
}

.Info img {
  width: 100%;
  height: 100%; 
  object-fit: cover;
}

</style>