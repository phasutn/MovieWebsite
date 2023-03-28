<template>
  <div class="info">
    <div>
      <div >
        <h1>{{ movieInfo.title }}</h1>
        <h2>{{ movieInfo.original_title }}</h2>
        <h3>{{ movieInfo.release_date }}</h3>
        <p>{{ movieInfo.overview }}</p>
        <input type="text" v-model='review'>
        <button @click="addReview">Add</button>
          <div v-for="(review, key) in reviews" :key ='key' >
            <div>
              {{review.review}}
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

  
<script>
import {collection, onSnapshot, doc, getFirestore, addDoc, setDoc, updateDoc, deleteDoc} from 'firebase/firestore'
//import { assert } from '@vue/compiler-core'
import axios from 'axios'
  export default {
    name: 'CityList',
    data () {
      return {
        movieInfo: {},
        movieId: this.$route.params.movieid,
        reviews: {},
        review: ''
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
      console.log('Review List');
      const db = getFirestore();
      const colRef = collection(db, "movies");
      const docRef = doc(colRef, this.movieId);
      const subColRef = collection(docRef, "reviews");
      onSnapshot(subColRef, snapShot => {
      this.reviews = snapShot.docs.map(doc => doc.data());
        //this.cityIds = snapShot.docs.map(doc => doc.id)
      });
    },
    methods: {
      async addReview() {
        const db = getFirestore()
        //const colRef = doc(collection(db,"reviews"))
        const docRef = doc(db, "movies", this.movieId);
        const subColRef = collection(docRef, "reviews");
        const subDocRef = doc(subColRef);
        //const subDocRef = doc(subColRef, this.movieId);
        const dataObj = {review: this.review};
        await setDoc(subDocRef, dataObj);
      },
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
