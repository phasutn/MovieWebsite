<template>
  <div class="info">
    <div>
      <div >
        <h1>{{ movieInfo.title }}</h1>
        <h2>{{ movieInfo.original_title }}</h2>
        <h3>{{ movieInfo.release_date }}</h3>
        <p>{{ movieInfo.overview }}</p>
      </div>
    </div>
  </div>
</template>

  
<script>
import {collection, onSnapshot, getFirestore} from 'firebase/firestore'
//import { assert } from '@vue/compiler-core'
import axios from 'axios'
  export default {
    name: 'CityList',
    data () {
      return {
        movieInfo: {},
        movieId: this.$route.params.movieid
      }
    },
    created() {
      let apikey = 'e4812b0763e5a2d97cbb969c192759a7'
      let infoUrl = 'https://api.themoviedb.org/3/movie/' + this.movieId + '?api_key=' + apikey;
      axios.get(infoUrl)
      .then((response) => {
        this.movieInfo = response.data;
        console.log(this.movieInfo);
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    mounted () {
      // console.log('City List')
      // const db = getFirestore()
      // const colRef = collection(db, "cities")
      // onSnapshot(colRef, snapShot => {
      //   this.cities = snapShot.docs.map(doc => doc.data())
      //   this.cityIds = snapShot.docs.map(doc => doc.id)
      // })
    },
    methods: {
      // logout () {
      //   console.log('logout')
      //   signOut(this.auth)
      // .then(()=>{
      //   this.$router.replace('/signin')
      // })
      // .catch((error) => {
      //   alert(error.message)
      // })
      // }
    }
  }
  </script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}
a {
  color: #ffffff;
}
p {
  font-size: 16px;
  margin-top: 10px;
}



</style>
